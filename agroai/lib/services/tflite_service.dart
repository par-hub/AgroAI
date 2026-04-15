import 'dart:io';
import 'package:http/http.dart' as http;
import 'dart:convert';
import '../models/prediction_result.dart';
import '../utils/constants.dart';

enum ModelState { idle, loading, ready, error }

class TFLiteService {
  ModelState _state = ModelState.idle;
  String? _errorMessage;

  ModelState get state => _state;
  bool get isReady => _state == ModelState.ready;
  String? get errorMessage => _errorMessage;

  /// Checks that the Flask server is reachable.
  Future<void> loadModel() async {
    if (_state == ModelState.ready || _state == ModelState.loading) return;
    _state = ModelState.loading;
    _errorMessage = null;

    try {
      final uri = Uri.parse('${AppConstants.flaskBaseUrl}/health');
      final response = await http.get(uri).timeout(const Duration(seconds: 5));
      if (response.statusCode == 200) {
        _state = ModelState.ready;
      } else {
        throw Exception('Server returned ${response.statusCode}');
      }
    } catch (e) {
      _state = ModelState.error;
      _errorMessage = 'Cannot reach server at ${AppConstants.flaskBaseUrl}\n$e';
      rethrow;
    }
  }

  /// Sends [imageFile] to the Flask /predict endpoint and returns the result.
  Future<PredictionResult> predict(File imageFile) async {
    if (!isReady) throw Exception('Server not reachable.');

    final uri = Uri.parse('${AppConstants.flaskBaseUrl}/predict');
    final request = http.MultipartRequest('POST', uri)
      ..files.add(await http.MultipartFile.fromPath('image', imageFile.path));

    final streamed = await request.send().timeout(const Duration(seconds: 30));
    final body = await streamed.stream.bytesToString();

    if (streamed.statusCode != 200) {
      throw Exception('Server error ${streamed.statusCode}: $body');
    }

    final json = jsonDecode(body) as Map<String, dynamic>;
    return PredictionResult(
      breedName: json['breed'] as String,
      confidence: (json['confidence'] as num).toDouble(),
    );
  }

  void dispose() {
    _state = ModelState.idle;
  }
}
