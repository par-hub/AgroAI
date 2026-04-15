class PredictionResult {
  final String breedName;
  final double confidence;

  const PredictionResult({
    required this.breedName,
    required this.confidence,
  });

  String get confidencePercent =>
      '${(confidence * 100).toStringAsFixed(1)}%';
}
