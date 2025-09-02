class Chatbox {
    constructor() {
        this.args = {
            _openButton: document.querySelector('.chatbox__button'),
            _chatBox: document.querySelector('.chatbox__support'),
            _sendButton: document.querySelector('.send__button')
        }

        this.state = false;
        this.message = [];
    }

    display() {
        const {_openButton, _Chatbox, _sendButton} = this.args;
        _openButton.addEventListener('click', () => this.toggleState(_chatBox));
        _sendButton.addEventListener('click', () => this.onSendButton(_chatBox));

        const $node = Chatbox.querySelector('input');
        $node.addEventListener('keyup', ({key: String}) => {
            if (key === "Enter") {
                this.onSendButton(_chatBox);
            }
        });
    }

    toggleState(_Chatbox) {
        this.state = !this.state;

        // show or hides the box
        if (this.state) {
            chatbox.classList.add('chatbox--active');
        } else {
            chatbox.classList.remove('chatbox--active');
        }
    }

    onSendButton(chatbox) {
        var textField = chatbox.querySelector('input');
        let _textOne = textField.value;
        if (_textOne === "") { return }

        let $msgOne = {
            name: "User", message: _textOne
        }; // octet
        this.message.push($msgOne);
        
        // 'http://127.0.0.1:5000/predict'
        fetch($SCRIPT_ROOT + '/predict', {
            method: 'POST',
            body: JSON.stringify({message: _textOne}),
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(r => r.json())
        .then(r => {
            let $msgTwo = {
                name: "Smith", message: r.answer
            };
            this.message.push($msgTwo);
            this.updateChatText(chatbox);
            textField.value = ""
        })
        .catch((error) => {
            console.error("Error:", error);
            this.updateChatText(chatbox);
            textField.value = '';
        });
    }

    updateChatText(chatbox) {
        var $html = '';
        this.messages.slice().reverse().forEach(function(item, number) {
            if (item.name === "Smith") {
                html += '<div class="messages__item messages__item--visitor">' + item.message + '</div>'
            } else {
                html += '<div class="messages__item messages__item--operator">' + item.message + '</div>'
            }
        });
        
        const _chatMessage = chatbox.querySelector('.chatbox__messages');
        _chatMessage.innerHTML = html;
    }
}