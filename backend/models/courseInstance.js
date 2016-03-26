module.exports = function(sequelize, DataTypes) {
    var CourseInstance = sequelize.define('CourseInstance', {
        course_id: {type: DataTypes.INTEGER, unique: 'composite_index'},
        semester_id: {type: DataTypes.INTEGER, unique: 'composite_index'},
    }, {
        tableName: 'course_instances',
        classMethods: {
            associate: function(models) {
                CourseInstance.belongsTo(models.Course, {onDelete: 'CASCADE', onUpdate: 'CASCADE'});
                CourseInstance.belongsTo(models.Semester, {onDelete: 'CASCADE', onUpdate: 'CASCADE'});
            }
        },
    });

    return CourseInstance;
};
