import 'package:flutter/material.dart';
import '../models/saved_breed_model.dart';

class SavedBreedTile extends StatelessWidget {
  final UserCattleModel cattle;
  final VoidCallback onDelete;

  const SavedBreedTile({
    super.key,
    required this.cattle,
    required this.onDelete,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 6),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      child: ListTile(
        leading: const CircleAvatar(
          backgroundColor: Color(0xFFE8F5E9),
          child: Icon(Icons.pets, color: Color(0xFF1B5E20)),
        ),
        title: Text(
          cattle.breedName,
          style: const TextStyle(fontWeight: FontWeight.w600),
        ),
        subtitle: cattle.nickname != null && cattle.nickname!.isNotEmpty
            ? Text(
                cattle.nickname!,
                maxLines: 2,
                overflow: TextOverflow.ellipsis,
              )
            : cattle.createdAt != null
                ? Text(
                    '${cattle.createdAt!.day}/${cattle.createdAt!.month}/${cattle.createdAt!.year}',
                    style:
                        TextStyle(color: Colors.grey.shade500, fontSize: 12),
                  )
                : null,
        trailing: IconButton(
          icon: const Icon(Icons.delete_outline, color: Colors.red),
          onPressed: () => _confirmDelete(context),
        ),
      ),
    );
  }

  void _confirmDelete(BuildContext context) {
    showDialog<void>(
      context: context,
      builder: (_) => AlertDialog(
        title: const Text('Remove Cattle'),
        content: Text('Remove "${cattle.breedName}" from your profile?'),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Cancel'),
          ),
          TextButton(
            onPressed: () {
              Navigator.pop(context);
              onDelete();
            },
            child: const Text('Remove',
                style: TextStyle(color: Colors.red)),
          ),
        ],
      ),
    );
  }
}
