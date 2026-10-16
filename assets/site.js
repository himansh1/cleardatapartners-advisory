'use strict';
const localize = text => window.ClearDataPartnersI18n?.text(text) || text;
(() => {
 document.body.classList.add('js');
 const openTarget = () => {
  const id = location.hash.slice(1); if(!id)return;
  const target = document.getElementById(id);
  const disclosure = target?.matches('details') ? target : target?.querySelector('details');
  if(disclosure)disclosure.open = true;
 };
 openTarget(); window.addEventListener('hashchange',openTarget);
 document.querySelectorAll('.service-table a[href^="#"]').forEach(link=>link.addEventListener('click',()=>{
  const detail=document.getElementById(link.getAttribute('href').slice(1))?.querySelector('details');
  if(detail)detail.open=true;
 }));
 const service = new URLSearchParams(location.search).get('service');
 const selectField = document.querySelector('select[name="service"]');
 if(selectField && [...selectField.options].some(option=>option.value===service))selectField.value=service;
 const textFor = (form) => {
  const data = new FormData(form);
  if(form.id==='updates-form')return `${localize('Please add me to ClearData Partners email updates.')}\n\n${localize('Email:')} ${data.get('email')}\n${localize('Consent: I asked to receive ClearData Partners email updates.')}\n`;
  return `${localize('ClearData Partners enquiry')}\n\n${localize('Name:')} ${data.get('name')}\n${localize('Email:')} ${data.get('email')}\n${localize('Company:')} ${data.get('company')||localize('Not supplied')}\n${localize('Service:')} ${localize(selectField?.selectedOptions?.[0]?.textContent || data.get('service'))}\n\n${localize('Question / project idea:')}\n${data.get('message')}\n`;
 };
 document.querySelectorAll('#enquiry-form,#updates-form').forEach(form => {
  form.addEventListener('submit', event => {
   event.preventDefault();if(!form.reportValidity())return;
   const signup = form.id==='updates-form';
   const subject = localize(signup ? 'ClearData Partners email signup request' : 'ClearData Partners project enquiry');
   const status = document.getElementById(signup?'updates-status':'enquiry-status');
   status.textContent = localize('Opening your mail app. Review the draft and send it to complete your request.');
   location.href = 'mailto:himanshmishra1@gmail.com?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(textFor(form));
  });
 });
 document.querySelectorAll('[data-save-form]').forEach(button => {
  button.addEventListener('click', () => {
   const form = document.getElementById(button.dataset.saveForm);if(!form.reportValidity())return;
   const url = URL.createObjectURL(new Blob([textFor(form)],{type:'text/plain;charset=utf-8'}));
   const download = document.createElement('a');download.href=url;download.download='ClearData Partners-enquiry.txt';document.body.append(download);download.click();download.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
   document.getElementById('enquiry-status').textContent=localize('Saved a copy to your device. Your enquiry has not been sent.');
  });
 });
})();
