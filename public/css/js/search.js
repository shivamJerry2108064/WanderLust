async function search(){
    const searchQuery = document.getElementById("searchInput").value.toLowerCase();
    const listing_card = document.querySelectorAll(".card");

  

    listing_card.forEach(listing =>{
        const title = listing.querySelector("h5").innerText.toLowerCase();
        if(title.includes(searchQuery)){
            listing.style.display="block";
        }else{
            listing.style.display = "none";
        }
    });

    

    return false;
}