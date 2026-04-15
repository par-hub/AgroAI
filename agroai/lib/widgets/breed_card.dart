import 'package:flutter/material.dart';
import '../models/breed_model.dart';

class BreedCard extends StatelessWidget {
  final BreedFullInfoModel breed;

  const BreedCard({super.key, required this.breed});

  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: 2,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // ── Breed name ───────────────────────────────────────────
            Row(
              children: [
                const CircleAvatar(
                  backgroundColor: Color(0xFFE8F5E9),
                  child: Icon(Icons.agriculture, color: Color(0xFF1B5E20)),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: Text(
                    breed.breedName,
                    style: Theme.of(context).textTheme.titleLarge?.copyWith(
                          fontWeight: FontWeight.bold,
                          color: const Color(0xFF1B5E20),
                        ),
                  ),
                ),
              ],
            ),
            const Divider(height: 24),

            // ── Characteristics ───────────────────────────────────────
            _InfoRow(label: 'Origin', value: breed.origin ?? 'N/A'),
            _InfoRow(label: 'Avg Milk Yield', value: breed.milkYieldDisplay),
            _InfoRow(label: 'Horn Size', value: breed.hornSizeDisplay),
            _InfoRow(
                label: 'Fertility Period', value: breed.fertilityDisplay),

            // ── Diseases ──────────────────────────────────────────────
            if (breed.diseases.isNotEmpty) ...[
              const SizedBox(height: 12),
              const Text(
                'Common Diseases',
                style: TextStyle(
                  fontWeight: FontWeight.bold,
                  fontSize: 14,
                  color: Color(0xFF1B5E20),
                ),
              ),
              const SizedBox(height: 8),
              ...breed.diseases.map((d) => _DiseaseChip(disease: d)),
            ],
          ],
        ),
      ),
    );
  }
}

class _InfoRow extends StatelessWidget {
  final String label;
  final String value;

  const _InfoRow({required this.label, required this.value});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 6),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          SizedBox(
            width: 140,
            child: Text(
              '$label:',
              style: const TextStyle(
                fontWeight: FontWeight.w600,
                color: Colors.black87,
              ),
            ),
          ),
          Expanded(
            child: Text(value, style: const TextStyle(color: Colors.black54)),
          ),
        ],
      ),
    );
  }
}

class _DiseaseChip extends StatelessWidget {
  final DiseaseInfo disease;

  const _DiseaseChip({required this.disease});

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(bottom: 8),
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
      decoration: BoxDecoration(
        color: Colors.red.shade50,
        borderRadius: BorderRadius.circular(8),
        border: Border.all(color: Colors.red.shade100),
      ),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Icon(Icons.warning_amber_rounded,
              size: 18, color: Colors.red.shade400),
          const SizedBox(width: 8),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  disease.name,
                  style: const TextStyle(
                      fontWeight: FontWeight.w600, fontSize: 13),
                ),
                const SizedBox(height: 2),
                Text(
                  'Cure: ${disease.cure}',
                  style: TextStyle(
                      fontSize: 12, color: Colors.grey.shade700),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
