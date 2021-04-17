class FetchNews {

  getPostData() {
    return fetch("https://content.guardianapis.com/search?show-fields=all&api-key=2a0b05ae-00bc-4442-be8c-e2d3e6c6c644").then(response => {
      return response.json();
    })
  }

  renderPostMain(postData) {
    let results = postData.response.results;
    let num = 0;
    results.forEach(function(result){
      let newDiv = document.createElement("div");
      newDiv.className = "oneHeadlineDiv";
      let newP = document.createElement("p");
      newP.setAttribute("id", num)
      num += 1;

      newP.textContent += result.webTitle;

      newDiv.innerHTML += "<img src='" + result.fields.thumbnail + "'><br>";
      // let headlineDiv = document.getElementById("headlines");
      newDiv.appendChild(newP);

      let headlineDiv = document.getElementById("headlines");
      headlineDiv.appendChild(newDiv);
    });
  }


  renderPostSummary(postData, storyId) {
    let results = postData.response.results;

    let abbreviatedStory = this.abbrev(results[storyId].fields.body);
    let summaryDivContent = document.createElement("div");
    summaryDivContent.idName = "summaryStory";
    summaryDivContent.innerHTML += "<img src='" + results[storyId].fields.thumbnail + "'><br>" + "<p class='summaryText'>" + abbreviatedStory + "</p>";
    let summaryDiv = document.getElementById("showSummary");
    summaryDiv.replaceChild(summaryDivContent, summaryDiv.childNodes[0]);
}


  runRequestMain(){
    this.getPostData().then(post => {
      this.renderPostMain(post);
    });
  }

  runRequestSummary(storyId){
    this.getPostData().then(post => {
      this.renderPostSummary(post, storyId);
    });
  }


  abbrev(text) {
    return text.slice(0,1000) + "...";
  }

}