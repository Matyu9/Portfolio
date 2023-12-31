const input = document.getElementById('cmd');
const fieldToUpdate = document.getElementById('cmd-results-input');
let commands = [];
input.value = '';


fetch('assets/js/json/cmd.json')
    .then(response => {
        if (!response.ok){
            throw new Error('Erreur de chargements du fichier json');
        }
        return response.json();
    })
    .then(data =>{
        commands = data;
    })
    .catch(error => {
        console.log('Une erreur est survenue ! ', error)
    });


function ajusterTaille(input) {
    // Récupérer la longueur du texte
    let longueurTexte = input.value.length;

    if (longueurTexte * 10 >= input.style.width) {
        // Ajuster la largeur de l'input en fonction de la longueur du texte
        input.style.width = (longueurTexte * 10) + 'px'; // Vous pouvez ajuster le facteur multiplicatif selon vos besoins
    } else {}
}

function ajouterCommande(cmd){
    if (cmd === 'clear'){
        fieldToUpdate.innerHTML = "";
        return
    }

    const element = document.createElement('div');

    const cmdName = document.createElement('p');
    cmdName.setAttribute('class', 'command');
    cmdName.innerHTML = `<span class="green">matyu@deb:~$/Interaction/</span> ${cmd}`;

    const cmdResultDiv = document.createElement('div');
    cmdResultDiv.setAttribute('class', 'result');
    const cmdResultText = document.createElement('p')

    if (commands[cmd]){
        cmdResultText.innerHTML = commands[cmd];
    } else {
        cmdResultText.innerHTML = commands['error'];
    }


    element.appendChild(cmdName);

    cmdResultDiv.appendChild(cmdResultText);
    element.appendChild(cmdResultDiv);

    fieldToUpdate.appendChild(element);
    input.style.width = "375px";
    input.scrollIntoView({ behavior: 'smooth', block: 'end' });
    window.scrollBy(0, 1000);
}

input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        ajouterCommande(input.value.toLowerCase())
        input.value = '';
    }
});