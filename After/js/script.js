function startQuiz() {
    console.log("立即檢測");
    document.getElementById("mainPage").style.display = "none"; // 隱藏首頁
    document.getElementById("question1").style.display = "block"; // 顯示第一題
}

// 紀錄分數並跳到下一題
let scores = {
    influencer: 0,
    nature: 0,
    nostalgia: 0,
    foodie: 0
};

// 增加分數並跳轉下一題
function addScoreAndNext(currentQuestion, scoreObject) {
    console.log("Current Question: " + currentQuestion);
    console.log("Score Object: ", scoreObject);
    // 更新分數邏輯
    scores.influencer += scoreObject.influencer || 0;
    scores.nature += scoreObject.nature || 0;
    scores.nostalgia += scoreObject.nostalgia || 0;
    scores.foodie += scoreObject.foodie || 0;

    console.log("Updated Scores:", scores);
    // 跳到下一題
    nextQuestion(currentQuestion);
}

function nextQuestion(currentQuestion) {
    const currentDiv = document.getElementById('question' + currentQuestion);
    const nextDiv = document.getElementById('question' + (currentQuestion + 1));

    if (currentDiv) {
        currentDiv.style.display = 'none';  // 隱藏當前題目
    }

    // 如果是第九題，跳轉到 loading 畫面
    if (currentQuestion === 9) {
        setTimeout(function () {
            window.location.href = 'loading.html';  // 500毫秒後跳轉到 loading.html
        }, 500);  // 設置0.5秒的延遲時間
    } else if (nextDiv) {
        nextDiv.style.display = 'block';  // 顯示下一題
    } else {
        showResult();  // 如果已經是最後一題，顯示結果
    }
}

// 顯示測驗結果
function showResult() {
    document.getElementById('resultPage').style.display = 'flex';
    document.getElementById('Q10').style.display= 'none';

    console.log("Current scores:", scores);

    // 根據分數判斷最高的類別
    const maxCategory = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);

    console.log("Max category:", maxCategory);

    let resultText = '';
    let link = '';
    switch (maxCategory) {
        case 'influencer':
            resultText = '你是「網美」類型，喜歡拍照打卡！';
            link = "influencer.html";
            break;
        case 'nature':
            resultText = '你是「自然」類型，喜歡親近大自然！';
            link = "nature.html";
            break;
        case 'nostalgia':
            resultText = '你是「懷舊」類型，喜歡懷舊風格！';
            link = "nostalgia.html";
            break;
        case 'foodie':
            resultText = '你是「老饕」類型，熱愛美食！';
            link = "foodie.html";
            break;
    }
    document.getElementById('resultText').innerText = resultText;
    document.getElementById('resultLink').href = link;
}

// 獲取圖片和提示文字的 DOM 元素
const hintImage = document.getElementById('hint-image');
const hintText = document.getElementById('hint-text');

// 為圖片添加點擊事件
hintImage.addEventListener('click', function() {
    // 切換提示文字的顯示/隱藏狀態
    if (hintText.style.display === 'none') {
        hintText.style.display = 'block'; // 顯示文字
    } else {
        hintText.style.display = 'none';  // 隱藏文字
    }
});

// 互動1到2
document.getElementById('submit-btn').addEventListener('click', function() {
    event.preventDefault();
    const selectedAnswer = document.querySelector('input[name="answer"]:checked');

    if (selectedAnswer) {
        if (selectedAnswer.value === 'correct') {
            document.getElementById('intact1').style.display='none';
            document.getElementById('intact2').style.display='flex';
        } else {
            alert('答案錯誤，請再試一次！');
        }
    } else {
        alert('請先選擇一個答案！');
    }
});

// 互動2到Q10
document.getElementById('submit-btn2').addEventListener('click', function() {
    event.preventDefault();
    const selectedAnswer = document.querySelector('input[name="answer"]:checked');

    if (selectedAnswer) {
        if (selectedAnswer.value === 'correct') {
            document.getElementById('intact2').style.display='none';
            document.getElementById('Q10').style.display='flex';
        } else {
            alert('答案錯誤，請再試一次！');
        }
    } else {
        alert('請先選擇一個答案！');
    }
});