const validTypes = ['Terre', 'Eau', 'Feu', 'Glace', 'Amour', 'Paix'];

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Producer', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {msg: 'Le champ name ne peut pas être vide'},
                notNull: {msg: 'Le champs name est requis'}
            }
        },
        hp: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: {msg: 'Utilisez uniquement des nombres entiers pour le champs hp'},
                notNull: {msg: 'Le champs hp est requis'},
                min: {
                    args: [0],
                    msg: 'hp must be sup 0'
                },
                max: {
                    args: [999],
                    msg: 'hp must be inf 999'
                }
            }
        },
        cp: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: {msg: 'Utilisez uniquement des nombres entiers pour le champs cp'},
                notNull: {msg: 'Le champs cp est requis'},
                min: {
                    args: [0],
                    msg: 'cp must be sup 0'
                },
                max: {
                    args: [999],
                    msg: 'cp must be inf 999'
                }
            }
        },
        picture: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isUrl: {msg: 'Utilisez uniquement une url valide pour l\'image'},
                notNull: {msg: 'Le champs picture est requis'}
            }
        },
        types: {
            type: DataTypes.STRING,
            allowNull: false,
            get() {
                return this.getDataValue('types').split(',')
            },
            set(types) {
                this.setDataValue('types', types.join())
            },
            validate: {
                isTypesValid(values) {
                    if (!values) {
                        throw new Error('le producteur doit avoir un type')
                    }
                    if (values.split(',').length > 3) {
                        throw new Error()
                    }
                    values.split(',').forEach(value => {
                        if (!validTypes.includes(value)) {
                            throw new Error(`Le type doit appartenir à la liste suivznte ${validTypes}`)
                        }
                    })
                }
            }
        }
    }, {
        timestamps: true,
        createdAt: 'created',
        updatedAt: false
    })
}