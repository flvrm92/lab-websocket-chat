import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateSettings1619288383547 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'settings',
                columns: [{
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true
                }, {
                    name: 'username',
                    type: 'varchar',                    
                }, {
                    name: 'chat',
                    type: 'boolean',
                    default: true
                }, {
                    name: 'updatedAt',
                    type: 'timestamp',
                    default: 'now()'
                },
                {
                    name: 'createdAt',
                    type: 'timestamp',
                    default: 'now()'
                }]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('Settings');
    }

}
