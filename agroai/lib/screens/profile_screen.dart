import 'package:flutter/material.dart';
import 'package:supabase_flutter/supabase_flutter.dart';
import '../models/saved_breed_model.dart';
import '../services/auth_service.dart';
import '../services/supabase_service.dart';
import '../widgets/saved_breed_tile.dart';
import 'auth/login_screen.dart';

class ProfileScreen extends StatefulWidget {
  const ProfileScreen({super.key});

  @override
  State<ProfileScreen> createState() => _ProfileScreenState();
}

class _ProfileScreenState extends State<ProfileScreen> {
  final _auth = AuthService();
  final _supabase = SupabaseService();

  List<UserCattleModel> _cattle = [];
  bool _loading = false;

  @override
  void initState() {
    super.initState();
    _load();
  }

  Future<void> _load() async {
    final user = _auth.currentUser;
    if (user == null) return;
    setState(() => _loading = true);
    try {
      final list = await _supabase.fetchUserCattle(user.id);
      if (mounted) setState(() => _cattle = list);
    } catch (e) {
      _snack('Failed to load: $e', Colors.red);
    } finally {
      if (mounted) setState(() => _loading = false);
    }
  }

  Future<void> _delete(UserCattleModel item) async {
    if (item.id == null) return;
    try {
      await _supabase.deleteUserCattle(item.id!);
      if (mounted) {
        setState(() => _cattle.remove(item));
        _snack('Removed.', const Color(0xFF1B5E20));
      }
    } on PostgrestException catch (e) {
      _snack('Delete failed: ${e.message}', Colors.red);
    }
  }

  Future<void> _signOut() async {
    await _auth.signOut();
    if (!mounted) return;
    Navigator.pushAndRemoveUntil(
      context,
      MaterialPageRoute(builder: (_) => const LoginScreen()),
      (_) => false,
    );
  }

  void _showAddDialog() {
    final breedCtrl = TextEditingController();
    final nicknameCtrl = TextEditingController();

    showDialog<void>(
      context: context,
      builder: (ctx) => AlertDialog(
        title: const Text('Add Cattle Entry'),
        shape:
            RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            TextField(
              controller: breedCtrl,
              decoration: InputDecoration(
                labelText: 'Breed Name',
                border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(10)),
              ),
            ),
            const SizedBox(height: 12),
            TextField(
              controller: nicknameCtrl,
              decoration: InputDecoration(
                labelText: 'Nickname (optional)',
                border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(10)),
              ),
            ),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(ctx),
            child: const Text('Cancel'),
          ),
          ElevatedButton(
            onPressed: () async {
              if (breedCtrl.text.trim().isEmpty) return;
              Navigator.pop(ctx);
              await _addCattle(
                  breedCtrl.text.trim(), nicknameCtrl.text.trim());
            },
            style: ElevatedButton.styleFrom(
              backgroundColor: const Color(0xFF1B5E20),
              foregroundColor: Colors.white,
            ),
            child: const Text('Add'),
          ),
        ],
      ),
    );
  }

  Future<void> _addCattle(String breedName, String nickname) async {
    final user = _auth.currentUser;
    if (user == null) return;
    try {
      await _supabase.saveUserCattle(
        userId: user.id,
        breedName: breedName,
        nickname: nickname.isEmpty ? null : nickname,
      );
      _snack('Added!', const Color(0xFF1B5E20));
      _load();
    } on PostgrestException catch (e) {
      _snack('Add failed: ${e.message}', Colors.red);
    }
  }

  void _snack(String msg, Color color) {
    ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text(msg), backgroundColor: color));
  }

  @override
  Widget build(BuildContext context) {
    final user = _auth.currentUser;

    return Scaffold(
      backgroundColor: const Color(0xFFF5F5F5),
      appBar: AppBar(
        title: const Text('Profile'),
        backgroundColor: const Color(0xFF1B5E20),
        foregroundColor: Colors.white,
        elevation: 0,
        actions: [
          IconButton(
            icon: const Icon(Icons.logout),
            tooltip: 'Sign Out',
            onPressed: _signOut,
          ),
        ],
      ),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: _showAddDialog,
        backgroundColor: const Color(0xFF1B5E20),
        foregroundColor: Colors.white,
        icon: const Icon(Icons.add),
        label: const Text('Add Cattle'),
      ),
      body: Column(
        children: [
          // ── User info header ───────────────────────────────────────
          Container(
            width: double.infinity,
            color: const Color(0xFF1B5E20),
            padding: const EdgeInsets.fromLTRB(20, 0, 20, 24),
            child: Row(
              children: [
                CircleAvatar(
                  radius: 28,
                  backgroundColor: Colors.white24,
                  child: Text(
                    user?.email?.substring(0, 1).toUpperCase() ?? 'U',
                    style: const TextStyle(
                        fontSize: 24,
                        color: Colors.white,
                        fontWeight: FontWeight.bold),
                  ),
                ),
                const SizedBox(width: 14),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text('Logged in as',
                          style:
                              TextStyle(color: Colors.white70, fontSize: 12)),
                      Text(
                        user?.email ?? '',
                        style: const TextStyle(
                            color: Colors.white,
                            fontSize: 15,
                            fontWeight: FontWeight.w600),
                        overflow: TextOverflow.ellipsis,
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),

          // ── Section header ─────────────────────────────────────────
          Padding(
            padding: const EdgeInsets.fromLTRB(16, 16, 8, 8),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Text('My Cattle',
                    style: TextStyle(
                        fontSize: 18, fontWeight: FontWeight.bold)),
                IconButton(
                  icon: const Icon(Icons.refresh, color: Color(0xFF1B5E20)),
                  onPressed: _load,
                ),
              ],
            ),
          ),

          // ── List ────────────────────────────────────────────────────
          Expanded(
            child: _loading
                ? const Center(
                    child: CircularProgressIndicator(
                        color: Color(0xFF1B5E20)))
                : _cattle.isEmpty
                    ? const Center(
                        child: Column(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            Icon(Icons.agriculture,
                                size: 56, color: Colors.grey),
                            SizedBox(height: 12),
                            Text('No cattle added yet.',
                                style: TextStyle(color: Colors.grey)),
                          ],
                        ),
                      )
                    : RefreshIndicator(
                        onRefresh: _load,
                        color: const Color(0xFF1B5E20),
                        child: ListView.builder(
                          itemCount: _cattle.length,
                          padding: const EdgeInsets.only(bottom: 80),
                          itemBuilder: (_, i) => SavedBreedTile(
                            cattle: _cattle[i],
                            onDelete: () => _delete(_cattle[i]),
                          ),
                        ),
                      ),
          ),
        ],
      ),
    );
  }
}
