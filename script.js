fetch('https://codeforces.com/api/contest.list?') // api for the get request
    .then(response => response.json())
    .then(data => {
        const objects = [];
        let i = 0;
        while (data.result[i].phase == 'BEFORE') {
            objects.push(data.result[i]);
            i++;
        }
        let minimumTimer = data.result[0].relativeTimeSeconds;
        let resultTitle = data.result[0].name;
        let finalObject = data.result[0];
        for (i = 1; i < objects.length; i++) {
            if (data.result[i].relativeTimeSeconds > minimumTimer) {
                resultTitle = data.result[i].name;
                minimumTimer = data.result[i].relativeTimeSeconds;
                finalObject = data.result[i];
            }
        }
        document.getElementById('contestName').innerText = resultTitle;
        minimumTimer = 0 - minimumTimer;
        const seconds = parseInt(minimumTimer % 60);
        const minutes = parseInt((minimumTimer / 60) % 60);
        const hours = parseInt(minimumTimer / 3600);
        document.getElementById('timeRemaining').innerText = hours + 'h:' + minutes + 'm:' + seconds + 's';

        setInterval(() => {
            minimumTimer--;
            const seconds = parseInt(minimumTimer % 60);
            const minutes = parseInt((minimumTimer / 60) % 60);
            const hours = parseInt(minimumTimer / 3600);
            document.getElementById('timeRemaining').innerText = hours + 'h:' + minutes + 'm:' + seconds + 's';
        }, 1000);


        
    });

    document.getElementById('clickFunctionId').addEventListener('click', function () {
        window.location.href = "https://codeforces.com/contests";
    })