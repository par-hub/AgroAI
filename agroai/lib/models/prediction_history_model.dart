/// Matches the `prediction_history` table in Supabase.
class PredictionHistoryModel {
  final String? id;
  final String? userId;
  final String? imageUrl;
  final String predictedBreed;
  final double confidence;
  final DateTime? createdAt;

  const PredictionHistoryModel({
    this.id,
    this.userId,
    this.imageUrl,
    required this.predictedBreed,
    required this.confidence,
    this.createdAt,
  });

  factory PredictionHistoryModel.fromJson(Map<String, dynamic> json) {
    return PredictionHistoryModel(
      id: json['id'] as String?,
      userId: json['user_id'] as String?,
      imageUrl: json['image_url'] as String?,
      predictedBreed: json['predicted_breed'] as String,
      confidence: (json['confidence'] as num).toDouble(),
      createdAt: json['created_at'] != null
          ? DateTime.parse(json['created_at'] as String)
          : null,
    );
  }

  Map<String, dynamic> toJson() => {
        if (userId != null) 'user_id': userId,
        if (imageUrl != null) 'image_url': imageUrl,
        'predicted_breed': predictedBreed,
        'confidence': confidence,
      };
}
