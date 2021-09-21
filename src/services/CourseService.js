const courses = [
    {
        id: 1,
        image: "Picture1.jpg",
        title: "Trí tuệ nhân tạo",
        dayOfWeek: 2,
        periodStart: 3,
        periodEnd: 6,
        link: "https://us04web.zoom.us/j/7320644792?pwd=VVg2RDVZOGtwV1UyRmJ4bFVOYmpxdz09",
    },
    {
        id: 2,
        image: "Picture1.jpg",
        title: "Lập trình nâng cao",
        dayOfWeek: 3,
        periodStart: 2,
        periodEnd: 5,
        link: "https://us04web.zoom.us/j/8605633285?pwd=bkhtRlNxL3E3SnZCTU1oSFNHcHJNQT09",
    },
    {
        id: 3,
        image: "Picture1.jpg",
        title: "Công nghệ lập trình tích hợp",
        dayOfWeek: 4,
        periodStart: 3,
        periodEnd: 6,
        link: "https://us04web.zoom.us/j/6157305824?pwd=VHJZN3dESVNXMC9QbnozbEFRcEN0Zz09",
    },
    {
        id: 4,
        image: "Picture1.jpg",
        title: "Phân tích và thiết kế hệ thống",
        dayOfWeek: 5,
        periodStart: 1,
        periodEnd: 4,
        link: "https://us04web.zoom.us/j/3891008443?pwd=S3UwK0xxTGZWMVVCUThlRTBjYVhEUT09",
    },
    {
        id: 5,
        image: "Picture1.jpg",
        title: "Cơ sở dữ liệu nâng cao",
        dayOfWeek: 6,
        periodStart: 1,
        periodEnd: 4,
        link: "https://zoom.us/j/4586245260?pwd=ejdBUHlBZllMWlBMcWU2VTN6RFpTQT09",
    },
]

class CourseService{
    getAll(){
        return courses
    }

    getOneById(id){
        const course = courses.find(course => course.id === id)
        return course
    }
}

export default new CourseService()