import { getFacultyBySlug, getSortedFaculty } from '../../models/faculty/faculty.js';

const facultyListPage = async (req, res, next) => {
    try {
        const validSortOptions = ['name', 'department', 'title'];
        const sortBy = validSortOptions.includes(req.query.sort) ? req.query.sort : 'department';

        const facultyList = await getSortedFaculty(sortBy);

        res.render('faculty/list', {
            title: 'Faculty Directory',
            facultyList,
            faculty: facultyList,
            currentSort: sortBy
        });
    } catch (error) {
        next(error);
    }
};

const facultyDetailPage = async (req, res, next) => {
    const facultySlug = req.params.facultySlug;
    const facultyMember = await getFacultyBySlug(facultySlug);

    if (Object.keys(facultyMember).length === 0) {
        const err = new Error(`Faculty member ${facultySlug} not found`);
        err.status = 404;
        return next(err);
    }

    res.render('faculty/detail', {
        title: `${facultyMember.name} - Faculty Profile`,
        facultyMember: facultyMember
    });
};

export { facultyListPage, facultyDetailPage };