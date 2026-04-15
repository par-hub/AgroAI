class AppConstants {
  // ── Supabase ─────────────────────────────────────────────────────────
  static const String supabaseUrl = 'https://hrleryhdkyzuvopraohl.supabase.co';
  static const String supabaseAnonKey =
      'sb_publishable_YDgHeHMuKXwtYOkl0yyf0g_Gxor3dzj';

  // ── Flask inference server ────────────────────────────────────────────
  // Set this to your PC's local IP while on the same WiFi network.
  // Find it with: ipconfig → "IPv4 Address"
  static const String flaskBaseUrl = 'http://10.12.100.39:5000';

  // ── Model config ─────────────────────────────────────────────────────
  static const double confidenceThreshold = 0.40;

  // ── Theme colours ────────────────────────────────────────────────────
  static const int primaryColorValue = 0xFF1B5E20;
  static const int accentColorValue = 0xFF4CAF50;
}
