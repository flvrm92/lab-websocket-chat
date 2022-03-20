import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateConnections1619378542416 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'connections',
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
                    type: 'uuid',                    
                }, {
                    name: 'socketId',
                    type: 'uuid',                    
                },{
                    name: 'createdAt',
                    type: 'timestamp',
                    default: 'now()'
                },{
                    name: 'updatedAt',
                    type: 'timestamp',
                    default: 'now()'
                }]
            })
        );

        await queryRunner.createForeignKey(
            'connections',
            new TableForeignKey({
                name: 'FkConnectionUser',
                referencedTableName: 'users',
                referencedColumnNames: ['id'],
                columnNames: ['userId'],
                onDelete: 'set null',
                onUpdate: 'set null'
            })
        )

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('connections', 'FkConnectionUser');
        await queryRunner.dropTable('connections');
    }

}
