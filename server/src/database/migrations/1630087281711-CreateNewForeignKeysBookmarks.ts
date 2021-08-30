import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class CreateNewForeignKeysBookmarks1630087281711
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'bookmarks',
      new TableForeignKey({
        name: 'FKFolder',
        referencedTableName: 'folders',
        referencedColumnNames: ['id'],
        columnNames: ['folder_id'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('bookmarks', 'FKFolder');
  }
}
