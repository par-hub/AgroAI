import 'package:supabase_flutter/supabase_flutter.dart';
import '../models/breed_model.dart';
import '../models/saved_breed_model.dart';

class SupabaseService {
  SupabaseClient get _client => Supabase.instance.client;

  // ─────────────────────────────────────────────────────────────────
  // breed_full_info view
  // ─────────────────────────────────────────────────────────────────

  /// Queries the `breed_full_info` view.
  /// The view returns one row per disease → we aggregate into one model.
  Future<BreedFullInfoModel?> fetchBreedInfo(String breedName) async {
    final response = await _client
        .from('breed_full_info')
        .select()
        .ilike('breed_name', '%$breedName%');

    final rows = (response as List<dynamic>)
        .map((e) => e as Map<String, dynamic>)
        .toList();

    if (rows.isEmpty) return null;
    return BreedFullInfoModel.fromRows(rows);
  }

  // ─────────────────────────────────────────────────────────────────
  // prediction_history table
  // ─────────────────────────────────────────────────────────────────

  /// Inserts a new prediction record for the authenticated user.
  Future<void> savePrediction({
    required String userId,
    required String predictedBreed,
    required double confidence,
    String? imageUrl,
  }) async {
    await _client.from('prediction_history').insert({
      'user_id': userId,
      'predicted_breed': predictedBreed,
      'confidence': confidence,
      if (imageUrl != null) 'image_url': imageUrl,
    });
  }

  // ─────────────────────────────────────────────────────────────────
  // user_cattle table
  // ─────────────────────────────────────────────────────────────────

  /// Save a breed entry to the user's cattle list.
  Future<void> saveUserCattle({
    required String userId,
    required String breedName,
    String? nickname,
  }) async {
    await _client.from('user_cattle').insert({
      'user_id': userId,
      'breed_name': breedName,
      if (nickname != null && nickname.isNotEmpty) 'nickname': nickname,
    });
  }

  /// Fetch all cattle entries for [userId], newest first.
  Future<List<UserCattleModel>> fetchUserCattle(String userId) async {
    final response = await _client
        .from('user_cattle')
        .select()
        .eq('user_id', userId)
        .order('created_at', ascending: false);

    return (response as List<dynamic>)
        .map((e) => UserCattleModel.fromJson(e as Map<String, dynamic>))
        .toList();
  }

  /// Delete a single cattle entry by its [id].
  Future<void> deleteUserCattle(String id) async {
    await _client.from('user_cattle').delete().eq('id', id);
  }
}
