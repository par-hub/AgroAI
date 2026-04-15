import 'dart:io';
import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import '../services/tflite_service.dart';
import '../widgets/loading_overlay.dart';
import 'result_screen.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  final _picker = ImagePicker();
  final _tflite = TFLiteService();

  File? _selectedImage;
  bool _inferring = false; // true only during actual inference

  @override
  void initState() {
    super.initState();
    _loadModel();
  }

  Future<void> _loadModel() async {
    try {
      await _tflite.loadModel();
    } catch (e) {
      // Error is stored in _tflite.errorMessage — UI rebuilds via setState
    }
    if (mounted) setState(() {}); // refresh button/status
  }

  @override
  void dispose() {
    _tflite.dispose();
    super.dispose();
  }

  Future<void> _pickImage(ImageSource source) async {
    final picked = await _picker.pickImage(
      source: source,
      imageQuality: 90,
      maxWidth: 1024,
    );
    if (picked == null) return;
    setState(() => _selectedImage = File(picked.path));
  }

  Future<void> _runInference() async {
    if (_selectedImage == null || !_tflite.isReady) return;

    setState(() => _inferring = true);
    try {
      final result = await _tflite.predict(_selectedImage!);
      if (!mounted) return;
      Navigator.push(
        context,
        MaterialPageRoute(
          builder: (_) => ResultScreen(
            imageFile: _selectedImage!,
            prediction: result,
          ),
        ),
      );
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('Inference failed: $e'),
            backgroundColor: Colors.red,
          ),
        );
      }
    } finally {
      if (mounted) setState(() => _inferring = false);
    }
  }

  void _showSourcePicker() {
    showModalBottomSheet<void>(
      context: context,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
      ),
      builder: (_) => SafeArea(
        child: Wrap(
          children: [
            ListTile(
              leading:
                  const Icon(Icons.camera_alt, color: Color(0xFF1B5E20)),
              title: const Text('Camera'),
              onTap: () {
                Navigator.pop(context);
                _pickImage(ImageSource.camera);
              },
            ),
            ListTile(
              leading: const Icon(Icons.photo_library,
                  color: Color(0xFF1B5E20)),
              title: const Text('Gallery'),
              onTap: () {
                Navigator.pop(context);
                _pickImage(ImageSource.gallery);
              },
            ),
          ],
        ),
      ),
    );
  }

  // ── Model status banner ─────────────────────────────────────────
  Widget _modelStatusBanner() {
    switch (_tflite.state) {
      case ModelState.loading:
        return _banner(
          color: Colors.blue.shade50,
          icon: const SizedBox(
            width: 16,
            height: 16,
            child: CircularProgressIndicator(strokeWidth: 2),
          ),
          text: 'Loading model…',
        );
      case ModelState.error:
        return _banner(
          color: Colors.red.shade50,
          icon:
              Icon(Icons.error_outline, size: 18, color: Colors.red.shade600),
          text: 'Load failed: ${_tflite.errorMessage ?? 'unknown error'}. Tap to retry.',
          onTap: _loadModel,
          textColor: Colors.red.shade700,
        );
      case ModelState.ready:
        return _banner(
          color: Colors.green.shade50,
          icon: Icon(Icons.check_circle_outline,
              size: 18, color: Colors.green.shade600),
          text: 'Model ready',
          textColor: Colors.green.shade700,
        );
      case ModelState.idle:
        return const SizedBox.shrink();
    }
  }

  Widget _banner({
    required Color color,
    required Widget icon,
    required String text,
    Color? textColor,
    VoidCallback? onTap,
  }) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        width: double.infinity,
        margin: const EdgeInsets.only(bottom: 16),
        padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
        decoration: BoxDecoration(
          color: color,
          borderRadius: BorderRadius.circular(10),
        ),
        child: Row(
          children: [
            icon,
            const SizedBox(width: 10),
            Expanded(
              child: Text(
                text,
                style: TextStyle(
                  fontSize: 13,
                  color: textColor ?? Colors.black87,
                  fontWeight: FontWeight.w500,
                ),
              ),
            ),
            if (onTap != null)
              Icon(Icons.refresh, size: 18, color: textColor),
          ],
        ),
      ),
    );
  }

  // ── Detect button label ─────────────────────────────────────────
  Widget _detectButtonChild() {
    if (_inferring) {
      return const SizedBox(
        height: 22,
        width: 22,
        child:
            CircularProgressIndicator(strokeWidth: 2, color: Colors.white),
      );
    }
    if (_tflite.state == ModelState.loading) {
      return const Text('Model Loading…',
          style: TextStyle(fontSize: 16));
    }
    return const Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        Icon(Icons.search),
        SizedBox(width: 8),
        Text('Detect Breed', style: TextStyle(fontSize: 16)),
      ],
    );
  }

  bool get _canDetect =>
      _selectedImage != null && _tflite.isReady && !_inferring;

  @override
  Widget build(BuildContext context) {
    return LoadingOverlay(
      isLoading: _inferring,
      message: 'Running inference…',
      child: Scaffold(
        backgroundColor: const Color(0xFFF5F5F5),
        appBar: AppBar(
          title: const Text('AgroAI',
              style: TextStyle(fontWeight: FontWeight.bold)),
          backgroundColor: const Color(0xFF1B5E20),
          foregroundColor: Colors.white,
          elevation: 0,
        ),
        body: SingleChildScrollView(
          padding: const EdgeInsets.all(20),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              // ── Model status ──────────────────────────────────────
              _modelStatusBanner(),

              const Text(
                'Cattle Breed Detection',
                style: TextStyle(
                  fontSize: 22,
                  fontWeight: FontWeight.bold,
                  color: Color(0xFF1B5E20),
                ),
              ),
              const SizedBox(height: 4),
              const Text(
                'Upload a photo to identify the breed.',
                style: TextStyle(color: Colors.grey),
              ),
              const SizedBox(height: 24),

              // ── Image preview ─────────────────────────────────────
              GestureDetector(
                onTap: _showSourcePicker,
                child: Container(
                  height: 280,
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(16),
                    border: Border.all(
                        color: const Color(0xFF1B5E20), width: 1.5),
                  ),
                  clipBehavior: Clip.hardEdge,
                  child: _selectedImage != null
                      ? Image.file(_selectedImage!, fit: BoxFit.cover)
                      : Column(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Icon(Icons.add_a_photo_outlined,
                                size: 56, color: Colors.grey.shade400),
                            const SizedBox(height: 12),
                            Text(
                              'Tap to select image',
                              style: TextStyle(
                                  color: Colors.grey.shade500, fontSize: 15),
                            ),
                          ],
                        ),
                ),
              ),
              const SizedBox(height: 16),

              // ── Source buttons ────────────────────────────────────
              Row(
                children: [
                  Expanded(
                    child: OutlinedButton.icon(
                      onPressed: () => _pickImage(ImageSource.camera),
                      icon: const Icon(Icons.camera_alt),
                      label: const Text('Camera'),
                      style: OutlinedButton.styleFrom(
                        foregroundColor: const Color(0xFF1B5E20),
                        side:
                            const BorderSide(color: Color(0xFF1B5E20)),
                        padding:
                            const EdgeInsets.symmetric(vertical: 12),
                        shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(10)),
                      ),
                    ),
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: OutlinedButton.icon(
                      onPressed: () => _pickImage(ImageSource.gallery),
                      icon: const Icon(Icons.photo_library),
                      label: const Text('Gallery'),
                      style: OutlinedButton.styleFrom(
                        foregroundColor: const Color(0xFF1B5E20),
                        side:
                            const BorderSide(color: Color(0xFF1B5E20)),
                        padding:
                            const EdgeInsets.symmetric(vertical: 12),
                        shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(10)),
                      ),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 20),

              // ── Detect button ─────────────────────────────────────
              ElevatedButton(
                onPressed: _canDetect ? _runInference : null,
                style: ElevatedButton.styleFrom(
                  backgroundColor: const Color(0xFF1B5E20),
                  foregroundColor: Colors.white,
                  disabledBackgroundColor: Colors.grey.shade300,
                  padding: const EdgeInsets.symmetric(vertical: 16),
                  shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(12)),
                ),
                child: _detectButtonChild(),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
