 /* مصفوفة  */
 const questions = [
      {
        question: "uh",/* السوئال */
        options: ["m", "of ", "b", "a"], /* الخيارات */
        correct: "m", /* الاجابة الصحيحة */
      },

      {
        question: " ><><",
        options: ["yy", ";;", "ss", "sd"],
        correct: "sd",
      },

      {
        question: " sc",
        options: ["s", "d", "cs", "sc"],
        correct: "cs",
      },

      {
        question: "L",
        options: ["sc", "d", "c ", " xc"],
        correct: "xc",
      },

    ];

    let currentQuestion = 0;    /* حفظ رقم السؤال الحالي (يبدأ من السؤال الأول */

    let score = 0;    /* حفظ نتيجة اللاعب */

    let selectedAnswer = null; /* حفظ الخيار الذي اختاره المستخدم */

    const username = localStorage.getItem("currentPlayer") || 'name';  /*localStorage  اجلب اسم اللاعب     وبنحطو ب   "name" يتم استخدام الاسم الافتراضي  */

    /*idباستخدام  HTMLعناصر من الـ     */
    const questionText = document.getElementById("question-text");
    const optionsDiv = document.getElementById("options");
    const form = document.getElementById("quiz-form");
    const completionMessage = document.getElementById("completion-message");
    const newPlayerBtn = document.getElementById("new-player-btn");

    /* لتحميل السؤال الحالي على الصفحة. */
    function loadQuestion() {

      const q = questions[currentQuestion]; /* ستخراج السؤال الحالي من المصفوفة */

      selectedAnswer = null; /* عادة تعيين الإجابة المحددة حتى لا تُحتسب الإجابة السابقة */

      questionText.textContent = q.question; /* عرض نص السؤال في العنصر المخصص له على الصفحة*/
      
      optionsDiv.innerHTML = ""; /* تفريغ الخيارات القديمة من الواجهة قبل عرض الخيارات الجديدة*/

      q.options.forEach((opt) => { /* تكرار على كل خيار في السؤال الحالي */

        const div = document.createElement("div"); /* انشاء عناصر*/

        div.className = "option"; /*  div صنف option إعطاء العنصر */

        div.textContent = opt; /*  بين الاجوبة جوا البوكسات تبعها وقت تتهير   */

        /* وقت  تكبس  عالخيار 

بينشال التحديد على كل الخيارات التانية

selectedAnswerحفظ هذا الخيار في  */
        div.onclick = () => {
          document.querySelectorAll(".option").forEach((el) => el.classList.remove("selected"));
          div.classList.add("selected");
          selectedAnswer = opt;
        };

        optionsDiv.appendChild(div); /*  div ضافة العنصر لل*/
      });
    }
/* وقت ترسل النموذج   ما بتنعاد تتحمل الصفحة)*/
    form.onsubmit = (e) => {
      e.preventDefault();
/* إذا ما اختار المستخدم إجابة     مابروح عالسئال البعدو. */
      if (!selectedAnswer) return;
/*  scoreإذا  الإجابة  صح  4 نقط لل  */
      if (selectedAnswer === questions[currentQuestion].correct) {
        score += 4;
      }
/*   السؤال البعدو */
      currentQuestion++;

      /* إذا في  سؤال تاني  حمله */
      if (currentQuestion < questions.length) {
        loadQuestion();
      }
      /* عند انتهاء جميع الأسئلة:
localStorageيتم جلب النتائج القديمة من بنضيف نتيجة اللاعب الحالي إلى النتائج
نحفظ النتائج في 
 عرض رسالة الانتهاء*/
       else {
        let results = JSON.parse(localStorage.getItem("quizResults") || "[]");
        results.push({ name: username, score });
        localStorage.setItem("quizResults", JSON.stringify(results));

        form.style.display = "none";
        completionMessage.style.display = "block";
      }
   
    };
/* لاعب جديد */
    newPlayerBtn.onclick = () => {
      window.location.href = "index.html";
    };
/*  تحميل أول سؤال مباشرة عند فتح الصفحة */
    loadQuestion();


    /* stats */
const statsBody = document.getElementById("stats-body");  /* الصف الاول */
    const results = JSON.parse(localStorage.getItem("quizResults") || "[]"); /*quetoins بيسرجع البيانات من عند ال */

    const sorted = results.sort((a, b) => b.score - a.score); /* ترتيب النتائج  */

    sorted.forEach((player, index) => { /* ترتيب */
      const row = document.createElement("tr"); /* بيعمل صف جديد */
      /* بعبي البيانات بالجدول */
      row.innerHTML = `
        <td style="padding: 10px;">${index + 1}</td>
        <td style="padding: 10px;">${player.name}</td>
        <td style="padding: 10px;">${player.score}</td>
      `;
      statsBody.appendChild(row); /* بضيف سطر جديد */
    });
/* داالة حذف */
    function clearStats() {
      if (confirm("هل أنت متأكد من حذف جميع الإحصائيات؟")) {
        localStorage.removeItem("quizResults"); /* بتطيلع مربع منبثق  */
        location.reload();
      }
    }
     function startGame(event) { /*start دالة بتشتغل اول ما تكبس  */
    event.preventDefault(); /* بمنع السلوك الافتراضي */
    const playerName = document.getElementById("player-name").value.trim(); /* بجيب اسم اللاعب من الادخال الاول */
    if (playerName) { /* الشرط بقلك انو ما يكون الاسم فاضي */
      localStorage.setItem("currentPlayer", playerName);   /*localStorage بخزن اسم اللاعب ب */
      window.location.href = "questoins.html"; /* برجعك عال main  */
    }
  }