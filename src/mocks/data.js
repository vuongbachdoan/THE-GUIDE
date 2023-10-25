export const posts = [
    {
        creator: 0,
        title: 'Introduction to web based Java application ',
        content: 'A Java Servlet is a server-side technology that is used to create web applications. It is a Java class that extends the capabilities of a web server and responds to incoming requests. Servlets are robust and scalable because of the Java language 1. Before Servlets, Common Gateway Interface (CGI) scripting language was commonly used as a server-side programming language. However, there were many disadvantages to this technology. Servlets provide many advantages over CGI, such as scalability, robustness, and better performance 1.',
        description: 'A Java Servlet is a server-side technology that is used to create web applications. It is a Java class that extends the capabilities of a web server and responds to incoming requests. Servlets are robust and scalable because of the Java language 1. Before Servlets, Common Gateway Interface (CGI) scripting language was commonly used as a server-side programming language. However, there were many disadvantages to this technology. Servlets provide many advantages over CGI, such as scalability, robustness, and better performance 1.',
        subjectCode: 'PRJ301',
        coverImage: 'https://th.bing.com/th/id/OIP.lT2MFAkuTPhZW__tqbkF1wHaEo?w=258&h=180&c=7&r=0&o=5&dpr=1.1&pid=1.7',
        liked: 1000,
        department: 'Information Technology',
        comments: [
            0,
            1
        ],
        shared: 1,
        viewed: 1000
    }
]

export const comments = [
    {
        createAt: '',
        content: '',
        liked: 10
    },
    {
        createAt: '',
        content: '',
        liked: 10
    }
]

export const subjects = [
    {
        code: 'PRJ301',
        thumbnail: './assets/images/PRJ301.png',
        name: 'Web based Java application ',
        participations: [
            0
        ],
        department: 'Information Technology'
    }
]

export const users = [
    {
        role: 'Student',
        name: 'Bach Doan Vuong',
        email: 'vuongbdde160256@fpt.edu.vn',
        thumbnail: 'https://scontent.fhan4-3.fna.fbcdn.net/v/t39.30808-1/387041601_1058223048869922_4797909499667327158_n.jpg?stp=cp6_dst-jpg_p320x320&_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_ohc=3bxzsa54YskAX8YxwhR&_nc_ht=scontent.fhan4-3.fna&oh=00_AfADKR9kDLCcKJaMkTaXlYYk2gcYHJbRgqPc8nbfGI0VbQ&oe=6530ED85',
    }
]

export const notifications = [
    {
        id: "",
        title: "HoaDNT liked you post",
        timestamp: "2023-10-24T07:52:59Z",
        type: "reaction",
        description: "What is Java Servlet  /  PRJ301",
        linkTo: "/post",
        postId: "",
        thumbnail: "https://scontent.fhan4-3.fna.fbcdn.net/v/t39.30808-1/387041601_1058223048869922_4797909499667327158_n.jpg?stp=cp6_dst-jpg_p320x320&_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_ohc=3bxzsa54YskAX8YxwhR&_nc_ht=scontent.fhan4-3.fna&oh=00_AfADKR9kDLCcKJaMkTaXlYYk2gcYHJbRgqPc8nbfGI0VbQ&oe=6530ED85"
    },
    {
        id: "",
        title: "HoaDNT commented on your post",
        timestamp: "2023-10-24T07:52:59Z",
        type: "comment",
        description: "What is Java Servlet  /  PRJ301",
        linkTo: "/post",
        postId: "",
        thumbnail: "https://scontent.fhan4-3.fna.fbcdn.net/v/t39.30808-1/387041601_1058223048869922_4797909499667327158_n.jpg?stp=cp6_dst-jpg_p320x320&_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_ohc=3bxzsa54YskAX8YxwhR&_nc_ht=scontent.fhan4-3.fna&oh=00_AfADKR9kDLCcKJaMkTaXlYYk2gcYHJbRgqPc8nbfGI0VbQ&oe=6530ED85"
    },
    {
        id: "",
        title: "Your post have been approved by HoaDNT",
        timestamp: "2023-10-24T07:52:59Z",
        type: "system",
        description: "What is Java Servlet  /  PRJ301",
        linkTo: "/post",
        postId: "",
        thumbnail: "https://scontent.fhan4-3.fna.fbcdn.net/v/t39.30808-1/387041601_1058223048869922_4797909499667327158_n.jpg?stp=cp6_dst-jpg_p320x320&_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_ohc=3bxzsa54YskAX8YxwhR&_nc_ht=scontent.fhan4-3.fna&oh=00_AfADKR9kDLCcKJaMkTaXlYYk2gcYHJbRgqPc8nbfGI0VbQ&oe=6530ED85"
    },
]