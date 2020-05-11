import React from 'react';

const loadScript = () => {
    $(document).ready(function() {
        let count = 1;
        const autocomplete = document.getElementsByClassName('autocomplete')[0];
        const autocomplete_component = document.getElementById('autocomplete-component');
        const autocomplete_content = autocomplete_component.querySelector('div.autocomplete-content');
        const autocomplete_list_array = autocomplete_component.querySelectorAll('li.autocomplete__item');
        let autocomplete_text_input = autocomplete_component.getElementsByClassName('autocomplete-search')[0];
        
        autocomplete_text_input.addEventListener('input', function (e) {
            for (let i = 0; i < autocomplete_list_array.length; i++) {
                matching(autocomplete_list_array[i])
            }
            show_list(autocomplete_content);
            key_up_down();
        });
        
        autocomplete_text_input.addEventListener('click', function (e) {
            add_mobileClass();
            change_valueToPlaceholder();
            init_list();
            show_list(autocomplete_content);
            key_up_down();
        });
        
        autocomplete_text_input.addEventListener('keypress', function (e) {
            if (e.keyCode == 13) {
                const highlightedElement = autocomplete_content.querySelector('[data-highlight="true"]');
                set_selected(highlightedElement);
                e.target.value = highlightedElement.querySelector('span').innerHTML;
            }
            hide_list(autocomplete_content);
            init_list();
        });
        
        function matching(item) {
            let str = new RegExp(autocomplete_text_input.value, 'gi');
            if (item.dataset.searchcontent.match(str)) {
                item.dataset.display = 'true'
            } else {
                item.dataset.display = 'false';
                item.dataset.highlight = 'false';
                count = 0;
            }
        }
        
        function init_list() {
            count = 0;
            for (let i = 0; i < autocomplete_list_array.length; i++) {
                init_item(autocomplete_list_array[i]);
                autocomplete_list_array[i].addEventListener('click', copy_paste);
            }
        }
        
        function init_item(item) {
            item.dataset.display = 'true';
            item.dataset.highlight = 'false';
        }

        function change_valueToPlaceholder() {
            if(autocomplete_text_input.value) {
                autocomplete_text_input.placeholder = autocomplete_text_input.value;
            }
            autocomplete_text_input.value = "";
        }

        function set_selectedToText() {
            const selectedElements = autocomplete_component.querySelectorAll('li.autocomplete__item[data-selected="true"]');
            if(selectedElements && selectedElements.length) {
                const selectedValue = selectedElements[0].querySelector('span').innerHTML;
                autocomplete_text_input.setAttribute("value", selectedValue);
                autocomplete_text_input.value = selectedValue;
            } else {
                autocomplete_text_input.value = "";
            }
            autocomplete_text_input.placeholder = "";
        }

        function add_mobileClass() {
            autocomplete.classList.add('active');
        }

        function remove_mobileClass() {
            autocomplete.classList.remove('active');
        }
        
        function copy_paste(e) {
            set_selected(this);
            const selectedValue = this.querySelector('span').innerHTML;
            autocomplete_text_input.setAttribute("value", selectedValue);
            autocomplete_text_input.value = selectedValue;
            // todo : check match of list text and input value for .current 
            init_list();
            hide_list(autocomplete_content);
        }

        function set_selected(item) {
            const selectedElements = autocomplete_component.querySelectorAll('li.autocomplete__item[data-selected="true"]');
            if(selectedElements && selectedElements.length) {
                for (let i = 0; i < selectedElements.length; i++) {
                    selectedElements[i].dataset.selected = 'false';
                }
            }
            item.dataset.selected = 'true';
            remove_mobileClass();
        }
        
        function hide_list(ele) {
            ele.dataset.toggle = 'false';
        }
        
        function show_list(ele) {
            ele.dataset.toggle = 'true';
        }
        
        function key_up_down() {
            let items = autocomplete_component.querySelectorAll('li.autocomplete__item[data-display="true"]');
            let last = items[items.length - 1];
            let first = items[0];
            
            autocomplete_text_input.onkeydown = function (e) {
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
        $('.autocomplete .close').on('click touch', function(e) {
            e.preventDefault();
            e.stopPropagation();
            remove_mobileClass();
            hide_list(autocomplete_content);
            set_selectedToText();
        });
        $(document).on('click', 'body', function(event) {
            if(event) {
                const {target} = event;
                const targetClassName = (target.className) ? "." + target.className : "";
                if(targetClassName !== "autocomplete" && $(autocomplete_component).find(target).length <= 0) {
                    remove_mobileClass();
                    hide_list(autocomplete_content);
                    set_selectedToText();
                }
            }
        });
    });
}

const Autocomplete = (props) => {
    const {dataList, elementId, title, defaultValue, stylingClass} = props;
    let dafaultDataDisplay = "", defaultDataValue = "";
    const onClick = (value) =>{
        if(value && value.target) {
            const {target} = value;
            let valueElement = null;
            if(target.className === "autocomplete__itemname") {
                valueElement = target.parentNode;
            } else {
                valueElement = value.target;
            }
            if(valueElement && valueElement.dataset && valueElement.dataset.value) {
                if(props.onChange) {
                    props.onChange(valueElement.dataset.value);
                }
            }
        }
    }
    if(dataList && dataList.length) {
        if(defaultValue) {
            const dafaultData = dataList.find((data) => {
                return data.value.toUpperCase() === defaultValue.toUpperCase();
            });
            if(dafaultData) {
                dafaultDataDisplay = dafaultData.display;
                defaultDataValue = dafaultData.value;
            }

        }
        loadScript();
        //Do not change below HTML structure, id names and class names, as they are referenced in the scripts above.
        return (
            <div className="autocomplete" id="autocomplete-component">
                <span className="close"></span>
                <div className="select-wrap">
                    <input
                        className="form-control txt autocomplete-search"
                        type="text"
                        autoComplete="off"
                        value={dafaultDataDisplay}
                        placeholder=""
                        id={elementId}
                    />
                    <label className="form-control-placeholder" htmlFor={elementId}>
                        {title}
                    </label>
                </div>
                <div className="autocomplete-content" data-toggle="false">
                <div className="autocomplete__list">
                    <ul className="autocomplete__listwrap">
                    {dataList.map((item, index) => {
                        let stylingClassToApply = "";
                        if(item.isStylingRequired) {
                            stylingClassToApply += "highlight " + (stylingClass ? stylingClass : "");
                        }
                        const isSelected = item.value.toUpperCase() === defaultDataValue.toUpperCase();
                        return (
                            <li
                                key={index}
                                className={"autocomplete__item " + stylingClassToApply}
                                data-searchcontent={item.searchdata}
                                data-selected={isSelected.toString()}
                                data-display="true"
                                data-value={item.value}
                                data-highlight="false"
                                onClick={onClick}
                            >
                                <span className="autocomplete__itemname">{item.display}</span>
                            </li>
                        );
                    })}
                    </ul>
                </div>
                </div>
            </div>
        );
    }
}

export default Autocomplete;