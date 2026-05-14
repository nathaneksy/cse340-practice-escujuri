import { getFacultyById, getSortedFaculty } from "../../models/faculty/faculty.js";

const facultyListPage = (req, res) => {
    const currentSort = req.query.sort || "name";
    const faculty = getSortedFaculty(currentSort);

    res.render("faculty/list", {
        title: "Faculty Directory",
        faculty,
        currentSort
    });
};

const facultyDetailPage = (req, res) => {
    const facultyId = req.params.facultyId;
    const facultyMember = getFacultyById(facultyId);

    if (!facultyMember) {
        return res.status(404).render("404", {
            title: "Faculty Not Found"
        });
    }

    res.render("faculty/detail", {
        title: facultyMember.name,
        facultyMember
    });
};

export { facultyListPage, facultyDetailPage };