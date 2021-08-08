$(".delete").click(() => {
  if (confirm("Are you sure you want to delete ? ")) {
    $("#confirm").val("True");
  } else{
    $("#confirm").val("False");
  }
});

$("#btnsearch").click(() => {
  val = $("#search").val();
});
ha = $(".rw");
var selectbox = document.getElementById('selectbox');
var j = 0;
for (i of ha) {
  if (i.innerText == 'ACTION') {
    continue;
  }
  var option = document.createElement("option");
  option.text = i.innerText;
  option.value=i.innerText;
  selectbox.add(option, selectbox[j]);
  j++;
}
