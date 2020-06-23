var barun = {
    name : 'Barun Pradhan',
    adress: 'Chitwan',
    emails: 'barunpradhan987@gmail.com',
    interests: ['Coding', 'Football', 'Basketball'],
    education: [
        {
            name: 'SOS HGS Bharatpur',
            enrolledDate : '2012'
        },
        {
            name: 'SOS HGS Bharatpur (H)',
            enrolledDate : '2014'
        },
        {
            name: 'Kathmandu Engineering College',
            enrolledDate : '2016'
        }
    ]
};


my_div = document.getElementById('my_div');
for (var edu_key in barun.education){
    single_edu = barun.education[edu_key];
    p = document.createElement('p')
    p.innerHTML = "Name: " + single_edu.name + ", Date:" + single_edu.enrolledDate;
    my_div.appendChild(p);
}