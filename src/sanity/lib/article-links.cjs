const officialReferences = [
  {pattern:/^(Statut des avantages fiscaux|Tax Benefits Statute).*58\./i,url:'https://info.portaldasfinancas.gov.pt/pt/informacao_fiscal/codigos_tributarios/bf_rep/Pages/EBF58A.aspx'},
  {pattern:/^(Code de l’IRS|Personal Income Tax Code).*81/i,url:'https://info.portaldasfinancas.gov.pt/pt/informacao_fiscal/codigos_tributarios/cirs_rep/pages/irs81.aspx'},
  {pattern:/^(Administration fiscale portugaise, FAQ|Portuguese Tax and Customs Authority, IFICI FAQ)/i,url:'https://info.portaldasfinancas.gov.pt/pt/apoio_contribuinte/questoes_frequentes/pages/faqs-00643.aspx'},
  ...['20278','20276'].map(number=>({pattern:new RegExp('^(Instruction administrative|Administrative Circular).*'+number+'/2025'),url:`https://info.portaldasfinancas.gov.pt/pt/informacao_fiscal/legislacao/instrucoes_administrativas/Documents/Oficio_circulado_${number}_2025.pdf`})),
  {pattern:/^(Vous souhaitez vérifier votre éligibilité à l’IFICI|Would you like to check your IFICI eligibility)/i,url:'/contact'},
];
function addArticleLinks(post,slug) {
  if (!post || slug !== 'ifici-portugal-2026') return post;
  const body={...post.body};
  for(const language of ['fr','en']) body[language]=(body[language]||[]).map(block=>{
    if(block._type!=='block')return block;
    const text=(block.children||[]).map(child=>child.text||'').join('');
    const reference=officialReferences.find(item=>item.pattern.test(text));
    if(!reference || (block.markDefs||[]).some(mark=>mark._type==='link'))return block;
    const key='verified-reference-link';
    return {...block,markDefs:[...(block.markDefs||[]),{_key:key,_type:'link',href:reference.url}],children:block.children.map(child=>child._type==='span'?{...child,marks:[...(child.marks||[]),key]}:child)};
  });
  return {...post,body};
}
module.exports={addArticleLinks};
