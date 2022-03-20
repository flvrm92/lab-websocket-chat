import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateMessages1619297241841 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'messages',
                columns: [{
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true
                }, {
                    name: 'adminId',
                    type: 'uuid',
                    isNullable: true
                }, {
                    name: 'userId',
                    type: 'uuid'
                }, {
                    name: 'text',
                    type: 'varchar'
                }, {
                    name: 'createdAt',
                    type: 'timestamp',
                    default: 'now()'
                }],
                foreignKeys: [{
                    name: 'FkUser',
                    referencedTableName: 'users',
                    referencedColumnNames: ['id'],
                    columnNames: ['userId'],
                    onDelete: 'set null',
                    onUpdate: 'set null'
                }]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('messages');
    }

}
