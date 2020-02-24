 export const createElement=(tagName="div",id,className,src,name,dataID)=>parentElement=>{
    const element=document.createElement(tagName);
    className?element.classList.add(className):null;
    id?element.id=id:null;
    if(tagName==="img"){
      element.src=src;
      element.alt=name;
      element.dataset.id=dataID;
      (!dataID)&&(!undefined)?element.classList.add('active'):null;
    };
    if(parentElement)parentElement.appendChild(element);
    return element
  };


  export const createButton=(name,dataID,src,listener)=>perentElement=>{
    const controlButton=document.createElement('div'),
          input=document.createElement('input'),
          label=document.createElement('label'),
          span=document.createElement('span');
    controlButton.classList.add("control-button");
    input.type="radio";
    input.name=name;
    input.id=`${name}${dataID}`;
    input.dataset.id=dataID
    !dataID? input.setAttribute('checked',true):null;
    input.addEventListener("change", listener);
  
    label.setAttribute('for',`${name}${dataID}`);  
    label.classList.add('control-button');
    src.forEach((src,index)=>
    index?span.style.backgroundImage=`url(${src})`:label.style.backgroundImage=`url(${src})`
    )
  
    label.appendChild(span);
    controlButton.appendChild(input);
    controlButton.appendChild(label);
    perentElement.appendChild(controlButton);
  }