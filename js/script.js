// init
var baseUrl = "http://www.dnd5eapi.co/api/spells/";
var spells = [];

getClassSpells = (spellCaster) => {
    spells = [];
    var cont = document.getElementById('spellContainer'); 
    fetch(baseUrl + spellCaster)
    .then(dataWrappedByPromise => dataWrappedByPromise.json())
    .then(data => {
        spells = data.results;
    })
    .then(() => {
        while (cont.firstChild) {
            cont.removeChild(cont.firstChild);
        }
        spells.map(x => {
            // Display spells
            var spellDetails = document.createElement("div");
            spellDetails.setAttribute('id', `${x.name}`)
            var name = document.createElement("p");

            //Info button
            var info = document.createElement("button");
            info.innerText = "Get Info";
            info.setAttribute("id", `${x.name}Id`);
            info.setAttribute("class", "btn btn-info");
            info.setAttribute("onclick", `getSpell('${x.url}', '${x.name}')`);
            name.innerHTML = x.name;

            // Create new elements
            cont.appendChild(spellDetails);
            spellDetails.appendChild(name);
            spellDetails.appendChild(info);

            var hr = document.createElement("hr");
            cont.appendChild(hr)
        })
    })
}


getSpell = (spellUrl, spellName) => {

    // Update button
    var btn = document.getElementById(`${spellName}Id`);
    btn.innerText = "Collapse"
    btn.setAttribute("class", "btn btn-danger");
    btn.setAttribute("onclick", `removeInfo('${spellName}', '${spellUrl}')`);

    fetch(spellUrl)
    .then(dataWrappedByPromise => dataWrappedByPromise.json())
    .then(data => {
        
        // parent element / setup

        var parent = document.getElementById(`${spellName}`);
        var hr = document.createElement("hr");
        
        var divContainer = document.createElement("div");
        divContainer.setAttribute('id', `${spellName}Div`)

        parent.appendChild(divContainer);
        divContainer.appendChild(hr);

        // details
        var level = document.createElement("p");
        level.innerHTML = `Level: ${data.level}`;

        var school = document.createElement("p");
        school.innerHTML = `School: ${data.school.name}`;

        var range = document.createElement("p");
        range.innerHTML = `Range: ${data.range}`;

        var castingTime = document.createElement("p");
        castingTime.innerHTML = `Casting time: ${data.casting_time}`;

        var duration = document.createElement("p");
        duration.innerHTML = `Duration: ${data.duration}`;

        var ritual = document.createElement("p");
        ritual.innerHTML = `Ritual: ${data.ritual}`;

        var components = document.createElement("p");
        components.innerHTML = `Components: ${data.components}`;

        var material = document.createElement("p");
        if (!data.material) {
            material.innerHTML = `Materials: None required`;
        } else {
            material.innerHTML = `Materials: ${data.material}`;
        }

        var highLevel = document.createElement("p");
        if (!data.higher_level) {
            highLevel.innerHTML = `High Level: None specified`;
        } else {
            highLevel.innerHTML = `High Level: ${data.higher_level}`;
        }

        var description = document.createElement("p");
        description.innerHTML = `Detailed Description: ${data.desc}`;

        // Display
        divContainer.appendChild(level);
        divContainer.appendChild(school);
        divContainer.appendChild(range);
        divContainer.appendChild(castingTime);
        divContainer.appendChild(duration);
        divContainer.appendChild(ritual);
        divContainer.appendChild(components);
        divContainer.appendChild(material);
        divContainer.appendChild(highLevel);
        divContainer.appendChild(description);
        
    })
}

removeInfo = (parentId, url) => {
    // Update button
    var btn = document.getElementById(`${parentId}Id`);
    btn.innerText = "Get Info"
    btn.setAttribute("class", "btn btn-info");
    btn.setAttribute("onclick", `getSpell('${url}', '${parentId}')`);

    var parent = document.getElementById(parentId);
    var child = document.getElementById(`${parentId}Div`);        
    parent.removeChild(child);
}

toTop = () => {
    var target = document.getElementById('spellContainer');
    target.scrollTop = 0;
}

classChange = () => {
    var x = document.getElementById("classDropdown").value;
    getClassSpells(x);
}

search = () => {
    searchValue = document.getElementById('search').value;
    if (searchValue) {
        spells.map(x => {
            if (x.name.includes(searchValue)) {
                document.getElementById(x.name).scrollIntoView();
            }
        })
    } 
}