import React from 'react';

const loadScript = () => {
    $(document).ready(function() {
        var count = 1;
        var body = document.getElementsByTagName("body")[0];
        var group = document.getElementById('autocomplete-component');
        var list_group = group.querySelector('div.autocomplete-content');
        var list_array = group.querySelectorAll('li.autocomplete__item');
        var search = group.getElementsByClassName('autocomplete-search')[0];
        
        search.addEventListener('input', function (e) {
            for (var i = 0; i < list_array.length; i++) {
                matching(list_array[i])
            }
            show_list(list_group);
            key_up_down();
        });
        
        search.addEventListener('click', function (e) {
            init_list();
            show_list(list_group);
            key_up_down();
        });
        
        search.addEventListener('keypress', function (e) {
            if (e.keyCode == 13) {
                e.target.value = list_group.querySelector('[data-highlight="true"]').innerHTML
            }
            hide_list(list_group)
            init_list();
        });
        
        function matching(item) {
            var str = new RegExp(search.value, 'gi');
            if (item.innerHTML.match(str)) {
                item.dataset.display = 'true'
            } else {
                item.dataset.display = 'false';
                item.dataset.highlight = 'false';
                count = 0
            }
        }
        
        function init_list() {
            count = 0;
            for (var i = 0; i < list_array.length; i++) {
                init_item(list_array[i]);
                list_array[i].addEventListener('click', copy_paste);
            }
        }
        
        function init_item(item) {
            item.dataset.display = 'true';
            item.dataset.highlight = 'false';
        }
        
        function copy_paste() {
            search.value = this.innerHTML;
            // todo : check match of list text and input value for .current 
            init_list();
            hide_list(list_group);
        }
        
        function hide_list(ele) {
            ele.dataset.toggle = 'false'
        }
        
        function show_list(ele) {
            ele.dataset.toggle = 'true'
        }
        
        function key_up_down() {
            var items = group.querySelectorAll('li.autocomplete__item[data-display="true"]')
            var last = items[items.length - 1];
            var first = items[0];
            
            search.onkeydown = function (e) {
                if (e.keyCode === 38) {
                count--;
                count = count <= 0 ? items.length : count;
                items[count - 1].dataset.highlight = items[count - 1] ? 'true' : 'false';
                if (items[count]) {
                    items[count].dataset.highlight = 'false';
                }
                else {
                    first.dataset.highlight = 'false';
                }
                } 
                
                if (e.keyCode === 40) {
                items[count].dataset.highlight = items[count] ? 'true' : 'false';
                if (items[count - 1]) {
                    items[count - 1].dataset.highlight = 'false';
                }
                else {
                    last.dataset.highlight = 'false';
                }
                count++;
                count = count >= items.length ? 0 : count;
                }
            };
        }
        group.addEventListener('mouseleave', function(event){
            if (event.target != list_group && event.target.parentNode != list_group){
                list_group.dataset.toggle = 'false'
            }
        });
    });
}

const Autocomplete = (props) => {
    const value = ["one", "two", "three"];
    const selectId = "location", title = "Where do you want to go?";
    loadScript(); 
    return (
        <div className="autocomplete" id="autocomplete-component">
            <div className="select-wrap">
            <input
                className="form-control txt autocomplete-search"
                type="text"
                id={selectId}
                required
            />
            <label className="form-control-placeholder" htmlFor={selectId}>
                {title}
            </label>
            </div>
            <div className="autocomplete-content" data-toggle="false">
            <span className="close"></span>
            <div className="autocomplete__list">
                <ul>
                {value.map((item, index) => {
                    const itemClass = index === 0 ? "autocomplete__item item-bold" : "autocomplete__item";
                    return (
                    <li
                        key={index}
                        className={itemClass}
                        data-display="true"
                        data-highlight="false"
                    >
                        {item}
                    </li>
                    );
                })}
                </ul>
            </div>
            </div>
        </div>
    );
}

export default Autocomplete;