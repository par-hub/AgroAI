import 'dart:io';
import 'package:flutter/material.dart';
import 'package:supabase_flutter/supabase_flutter.dart';
import '../models/breed_model.dart';
import '../models/prediction_result.dart';
import '../services/auth_service.dart';
import '../services/supabase_service.dart';
import '../utils/constants.dart';
import '../widgets/breed_card.dart';

class ResultScreen extends StatefulWidget {
  final File imageFile;
  final PredictionResult prediction;

  const ResultScreen({
    super.key,
    required this.imageFile,
    required this.prediction,
  });

  @override
  State<ResultScreen> createState() => _ResultScreenState();
}

class _ResultScreenState extends State<ResultScreen> {
  final _supabase = SupabaseService();
  final _auth = AuthService();

  BreedFullInfoModel? _breedInfo;
  bool _loadingDetails = true;
  bool _saving = false;
  bool _saved = false;

  @override
  void initState() {
    super.initState();
    _fetchBreedInfo();
    _autoSavePrediction();
  }

  Future<void> _fetchBreedInfo() async {
    try {
      final info =
          await _supabase.fetchBreedInfo(widget.prediction.breedName);
      if (mounted) setState(() => _breedInfo = info);
    } catch (_) {
      // Breed not found — show prediction card only
    } finally {
      if (mounted) setState(() => _loadingDetails = false);
    }
  }

  /// Automatically records this prediction in prediction_history.
  Future<void> _autoSavePrediction() async {
    final user = _auth.currentUser;
    if (user == null) return;
    try {
      await _supabase.savePrediction(
        userId: user.id,
        predictedBreed: widget.prediction.breedName,
        confidence: widget.prediction.confidence,
      );
    } catch (_) {
      // Non-critical — silently ignore
    }
  }

  Future<void> _saveToProfile() async {
    final user = _auth.currentUser;
    if (user == null) {
      _snack('Log in to save breeds.', Colors.red);
      return;
    }
    setState(() => _saving = true);
    try {
      await _supabase.saveUserCattle(
        userId: user.id,
        breedName: widget.prediction.breedName,
      );
      if (mounted) setState(() => _saved = true);
      _snack('Saved to your cattle list!', const Color(0xFF1B5E20));
    } on PostgrestException catch (e) {
      _snack('Save failed: ${e.message}', Colors.red);
    } finally {
      if (mounted) setState(() => _saving = false);
    }
  }

  void _snack(String msg, Color color) {
    ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text(msg), backgroundColor: color));
  }

  Color _confidenceColor(double c) {
    if (c >= 0.75) return Colors.green;
    if (c >= AppConstants.confidenceThreshold) return Colors.orange;
    return Colors.red;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFF5F5F5),
      appBar: AppBar(
        title: const Text('Detection Result'),
        backgroundColor: const Color(0xFF1B5E20),
        foregroundColor: Colors.white,
        elevation: 0,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            // ── Selected image ──────────────────────────────────────
            ClipRRect(
              borderRadius: BorderRadius.circular(16),
              child: Image.file(
                widget.imageFile,
                height: 220,
                width: double.infinity,
                fit: BoxFit.cover,
              ),
            ),
            const SizedBox(height: 16),

            // ── Prediction card ─────────────────────────────────────
            Card(
              shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(16)),
              elevation: 2,
              child: Padding(
                padding: const EdgeInsets.all(20),
                child: Column(
                  children: [
                    const Text(
                      'Predicted Breed',
                      style: TextStyle(color: Colors.grey, fontSize: 13),
                    ),
                    const SizedBox(height: 8),
                    Text(
                      widget.prediction.breedName,
                      textAlign: TextAlign.center,
                      style: const TextStyle(
                        fontSize: 24,
                        fontWeight: FontWeight.bold,
                        color: Color(0xFF1B5E20),
                      ),
                    ),
                    const SizedBox(height: 12),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        const Text('Confidence: ',
                            style: TextStyle(fontSize: 14)),
                        Text(
                          widget.prediction.confidencePercent,
                          style: TextStyle(
                            fontSize: 16,
                            fontWeight: FontWeight.bold,
                            color: _confidenceColor(
                                widget.prediction.confidence),
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 6),
                    ClipRRect(
                      borderRadius: BorderRadius.circular(8),
                      child: LinearProgressIndicator(
                        value: widget.prediction.confidence.clamp(0.0, 1.0),
                        minHeight: 8,
                        backgroundColor: Colors.grey.shade200,
                        color:
                            _confidenceColor(widget.prediction.confidence),
                      ),
                    ),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 16),

            // ── Breed details from breed_full_info ─────────────────
            if (_loadingDetails)
              const Center(
                child: Padding(
                  padding: EdgeInsets.all(24),
                  child:
                      CircularProgressIndicator(color: Color(0xFF1B5E20)),
                ),
              )
            else if (_breedInfo != null)
              BreedCard(breed: _breedInfo!)
            else
              Card(
                shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(16)),
                child: const Padding(
                  padding: EdgeInsets.all(24),
                  child: Column(
                    children: [
                      Icon(Icons.info_outline, size: 40, color: Colors.grey),
                      SizedBox(height: 12),
                      Text(
                        'No breed details found in database.',
                        textAlign: TextAlign.center,
                        style: TextStyle(color: Colors.grey),
                      ),
                    ],
                  ),
                ),
              ),

            const SizedBox(height: 20),

            // ── Save to profile button ──────────────────────────────
            ElevatedButton.icon(
              onPressed: (_saving || _saved) ? null : _saveToProfile,
              icon: Icon(_saved ? Icons.check : Icons.add_circle_outline),
              label: Text(
                _saved ? 'Added to My Cattle' : 'Add to My Cattle',
                style: const TextStyle(fontSize: 16),
              ),
              style: ElevatedButton.styleFrom(
                backgroundColor:
                    _saved ? Colors.grey : const Color(0xFF1B5E20),
                foregroundColor: Colors.white,
                padding: const EdgeInsets.symmetric(vertical: 16),
                shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(12)),
              ),
            ),
            const SizedBox(height: 16),
          ],
        ),
      ),
    );
  }
}
