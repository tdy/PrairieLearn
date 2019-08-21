// @ts-check
const sqldb = require('@prairielearn/prairielib/sql-db');
const sqlLoader = require('@prairielearn/prairielib/sql-loader');

const infofile = require('../infofile');

const sql = sqlLoader.loadSqlEquiv(__filename);

/**
 * @param {import('../course-db').CourseData} courseData
 * @param {any} courseId
 */
module.exports.sync = async function(courseData, courseId) {
    if (infofile.hasErrors(courseData.course)) {
        // Skip syncing
        // TODO: write errors
        return;
    }

    const courseInfo = courseData.course.data;
    const params = {
        course_id: courseId,
        short_name: courseInfo.name,
        title: courseInfo.title,
        display_timezone: courseInfo.timezone || null,
        grading_queue: courseInfo.name.toLowerCase().replace(' ', ''),
        options: courseInfo.options || {},
    };
    const res = await sqldb.queryZeroOrOneRowAsync(sql.update_course, params);
    if (res.rowCount !== 1) throw new Error(`Unable to find course with ID ${courseId}`);
    courseInfo.timezone = res.rows[0].display_timezone;
};
