/// Matches the `user_cattle` table in Supabase.
class UserCattleModel {
  final String? id;
  final String userId;
  final String breedName;
  final String? nickname;
  final DateTime? createdAt;

  const UserCattleModel({
    this.id,
    required this.userId,
    required this.breedName,
    this.nickname,
    this.createdAt,
  });

  factory UserCattleModel.fromJson(Map<String, dynamic> json) {
    return UserCattleModel(
      id: json['id'] as String?,
      userId: json['user_id'] as String,
      breedName: json['breed_name'] as String,
      nickname: json['nickname'] as String?,
      createdAt: json['created_at'] != null
          ? DateTime.parse(json['created_at'] as String)
          : null,
    );
  }

  Map<String, dynamic> toJson() => {
        if (id != null) 'id': id,
        'user_id': userId,
        'breed_name': breedName,
        if (nickname != null && nickname!.isNotEmpty) 'nickname': nickname,
      };
}
