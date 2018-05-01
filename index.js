let quiz = {
    
    questionNumber : 0,
    score :0,
    totalQuestions: 10,
    
    init : function(){
      $('.js-startButton').click(quiz.startQuiz);
      $(".js-buttonRestart").click(quiz.startQuiz);
      $("#submitButton").click(quiz.handleSubmit);
      $('.js-buttonNext').click(quiz.handleNext);
      $('.js-startButton').focus();
    },
    
    startQuiz : function(){
      quiz.questionNumber = 0;
      quiz.score = 0;
      $(".js-buttonNext").text("Next");
       $(".js-questionSpan").text(quiz.questionNumber + 1 + "/10");
       $(".js-scoreSpan").text(quiz.score);
       $(".js-startScreen").hide();
       $(".js-finalCls").hide();
       $(".js-scoreDiv").show();
       quiz.displayQuestion();
    },
    
    displayQuestion: function(){
      quiz.populateQuestion();
      $(".questionCls").show();
      $(".js-questionSpan").text(quiz.questionNumber + 1 + "/10");
    },
    
    populateQuestion: function(){
      const question = questionBank[quiz.questionNumber];
      const questionText = (this.questionNumber + 1) + ". " + question.question;
      $(".questionDiv").find("legend").text(questionText);
      
      for(let i=0;i<question.options.length;i++){
        let elementID = "option" + (i+1);
        let text = question.options[i];
        $("#" + elementID).val(text).next("span").text(text);
      }
      $('input[type=radio]').prop('checked',false);
      $("#option1").focus();
    },
    
    handleSubmit: function(event){
      
      const selectedOption = $("input:checked").val();
      if (!selectedOption) return;
      event.preventDefault();
      const correctAns = questionBank[quiz.questionNumber].ans;
      const result = (selectedOption === correctAns) ? true : false;
      quiz.populateResult(result, correctAns);
      quiz.questionNumber += 1;
      quiz.displayResult();
    },
    
    populateResult : function(result, correctAns){
      if(result){
         $(".js-resultCls").find("img").attr("src", "images/happyMinion.png");
         quiz.score += 1;
         $(".js-resultCls").find("h2").text("You are correct !!!").removeClass("wrongClass");
        
      }else{
        $(".js-resultCls").find("img").attr("src", "images/sadMinion.png");
        $(".js-resultCls").find("h2").text("You are wrong !!!").addClass("wrongClass");
      }
      
      $(".js-resultCls").find(".ansClass").text(correctAns);
      
    }, 
    
    displayResult : function(){
      $(".questionCls").hide();
      $(".js-scoreSpan").text(quiz.score);
      $(".js-resultCls").show();
    },
    
    handleNext : function(){
      $(".js-resultCls").hide();
      if(quiz.questionNumber < quiz.totalQuestions){
        quiz.displayQuestion();
        if(quiz.questionNumber === (quiz.totalQuestions - 1)){
          $(".js-buttonNext").text("Result");
        }
      }else{
        $(".resultSpan").text(quiz.score + "/10");
        $(".js-scoreDiv").hide();
        $(".js-finalCls").show();
      }
      
    }
  };

$(quiz.init);