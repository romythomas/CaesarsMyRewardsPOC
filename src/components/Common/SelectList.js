import React from 'react';

const loadScript = () => {
    $(document).ready(function(){
        $('.selectList.dropdown > span').on('click touch', function(e) {
            e.preventDefault();
            const $self = $(this).parent();
            $self.toggleClass('open');
        });
        $(document).on('click touch', 'body', function(e) {
            const $dropdown = $('.selectList.dropdown');
            if($dropdown !== e.target && !$dropdown.has(e.target).length) {
                $dropdown.removeClass('open');
            }
        });
        $('.selectList.selectDropdown ul li a').on('click touch', function(e) {
            e.preventDefault();
            const $this = $(this);
            const $parent = $this.parent();
            const $dropdown = $parent.parent().parent();
            const active = $parent.hasClass('active');
            const label = $this.text();
            $dropdown.find('ul li').removeClass('active');
            $dropdown.toggleClass('filled', !active);
            $dropdown.children('span').text(label);
            if(!active) {
                $parent.addClass('active');
            }
            $dropdown.removeClass('open');
        });
    });
}

const SelectList = (props) => {
    const {dataList, defaultValue} = props;
    const onClick = (value) =>{
        if(props.onClick) {
            props.onClick(value);
        }
    }
    if(dataList && dataList.length) {
        loadScript();
        let valueToDisplay = defaultValue;
        return(
            <div className="selectList dropdown selectDropdown filled">
                <ul>
                    {dataList.map((data, index) => {
                        let isSelected = false;
                        if(defaultValue && data && data.value && data.value.toLowerCase() === defaultValue.toLowerCase()) {
                            isSelected = true;
                            valueToDisplay = data.name;
                        }
                        return (<li className={isSelected ? "active" : ""} key={index} ><a onClick={onClick} value={data.value} key={index}>{data.name}</a></li>);
                    })}
                </ul>
                <span>{valueToDisplay}</span>
            </div>
        )
    }
}

export default SelectList;