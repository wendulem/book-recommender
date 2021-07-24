$(document).ready(function () {
  console.log("AI Camp is for the best of the best.");

  //$('#loading').css('display', 'block')

  $("#text_gen_button").click(function () {
    console.log("text gen button is clicked");
    var prompt = $("#text_gen_input").val();
    // var prompt = $("#booktitles").val();
    console.log("text gen input value is");
    console.log(prompt);
    var url = "recommendations";

    $.post(
      url,
      {
        prompt: prompt,
      },
      function (data) {
        console.log(data);
        console.log(Object.keys(data['recommended_text']))
        var list_html = "";
        // Maybe also add the descriptions in a dropdown
        for (var t = 0; t < Object.keys(data['recommended_text']).length; t++) {
          list_html +=
            "<li id='generated_item_" +
            t +
            "'>" +
            data['recommended_text'][Object.keys(data['recommended_text'])[t]] +
            "</li>";
          list_html +=
            "<p id='generated_title_" +
            t +
            "'>" +
            Object.keys(data['recommended_text'])[t] +
            "</p>";
          $("#generated_ul").html(list_html);
        }
        //$('#loading').css('display', 'hide')
      }
    ).fail(function () {
      alert(
        "There is something unexpected happened. Email hello@ai-camp.org to report your findings."
      );
    });
  });
});
