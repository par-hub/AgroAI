/// Matches the `breed_full_info` view in Supabase.
/// The view returns one row per disease, so [fromRows] aggregates
/// all rows for a single breed into one object.
class BreedFullInfoModel {
  final String breedName;
  final String? origin;
  final double? avgMilkYieldLitersPerDay;
  final double? hornSizeCm;
  final int? fertilityPeriodMonths;
  final List<DiseaseInfo> diseases;

  const BreedFullInfoModel({
    required this.breedName,
    this.origin,
    this.avgMilkYieldLitersPerDay,
    this.hornSizeCm,
    this.fertilityPeriodMonths,
    required this.diseases,
  });

  /// Aggregates multiple view rows (one per disease) into one model.
  factory BreedFullInfoModel.fromRows(List<Map<String, dynamic>> rows) {
    assert(rows.isNotEmpty, 'rows must not be empty');
    final first = rows.first;

    final diseases = rows
        .where((r) => r['disease'] != null)
        .map((r) => DiseaseInfo(
              name: r['disease'] as String,
              cure: r['cure'] as String? ?? '',
            ))
        .toList();

    return BreedFullInfoModel(
      breedName: first['breed_name'] as String,
      origin: first['origin'] as String?,
      avgMilkYieldLitersPerDay:
          (first['average_milk_yield_liters_per_day'] as num?)?.toDouble(),
      hornSizeCm: (first['horn_size_cm'] as num?)?.toDouble(),
      fertilityPeriodMonths: first['fertility_period_months'] as int?,
      diseases: diseases,
    );
  }

  String get milkYieldDisplay => avgMilkYieldLitersPerDay != null
      ? '${avgMilkYieldLitersPerDay!.toStringAsFixed(1)} L/day'
      : 'N/A';

  String get hornSizeDisplay =>
      hornSizeCm != null ? '${hornSizeCm!.toStringAsFixed(1)} cm' : 'N/A';

  String get fertilityDisplay => fertilityPeriodMonths != null
      ? '$fertilityPeriodMonths months'
      : 'N/A';
}

class DiseaseInfo {
  final String name;
  final String cure;

  const DiseaseInfo({required this.name, required this.cure});
}
