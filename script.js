// выводим и красим отзыв
function listComment() {
    //очищаем отзывы
    $('#showcomment').empty();
    //отправляем запрос на получение отзыва
    $.ajax({
        url: 'http://localhost:3000/comment',
        dataType: 'json',
        success: function (showcomment) {
            var $ul = $('<ul />');
            showcomment.forEach(function (item) {
                var $li = $('<li />').text(item.text);

                var $buttoninsert = $('<button/>', {
                    text: 'Утвердить',
                    class: 'insert',
                    'data-id': item.id,
                });
                var $buttondelete = $('<button/>', {
                    text: 'Отклонить',
                    class: 'delete',
                    'data-id': item.id,
                });

                if (item.class === 'textarea') {
                    $li.append($buttoninsert);
                    $li.append($buttondelete);
                } else if (item.class === 'delete') {
                    $li.css({
                        color: 'red'
                    });
                    $li.addClass('delete')
                } else {
                    $li.css({
                        color: 'green'
                    });
                    $li.addClass('insert')
                }
                $ul.append($li);
            });
            //добавляем все в dom
            $('#showcomment').append($ul);

        }
    })
}

//добавляем отзыв
function submitComment() {
    $('#showcomment').on('click', '.insert', function () {
        var id = $(this).attr('data-id');
        $.ajax({
            url: 'http://localhost:3000/comment/' + id,
            type: 'PATCH',
            headers: {
                'content-type': 'application/json',
            },
            data: JSON.stringify({
                class: "insert",
            }),
            success: function () {
                listComment();
            }

        })
    })

}

//удаляем отзыв
function deleteComment() {
    $('#showcomment').on('click', '.delete', function () {
        var id = $(this).attr('data-id');
        $.ajax({
            //id это обращение к этому объекту
            url: 'http://localhost:3000/comment/' + id,
            type: 'PATCH',
            headers: {
                'content-type': 'application/json',
            },
            data: JSON.stringify({
                class: "delete",
            }),
            success: function () {
                listComment();
            }
        })
    })
}

//отправляем коммент
function sendComment() {
    var $textarea = $('<textarea/>', {
        class: 'textarea',
    });
    var $buttonsend = $('<button>', {
        text: 'Отправить',
        class: 'send',
    });
    $('#showcomment').append($buttonsend);
    $('#showcomment').append($textarea);

    $('#showcomment').on('click', '.send', function () {
        $.ajax({
            url: 'http://localhost:3000/comment',
            type: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            data: JSON.stringify({
                text: $(this).val($textarea),
                class: "textarea",
            }),
            success: function () {
                listComment();
            }
        })
    })
}

//отображаем все модули
(function ($) {
    $(function () {
        listComment();
        submitComment();
        deleteComment();
        sendComment();
    })
})(jQuery);
