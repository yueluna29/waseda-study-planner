import { useState, useRef, useCallback, useEffect } from "react";
import { BarChart3, Eye, FileText, ArrowLeft, Plus, Pencil, Trash2, Check, X, User, Calendar, Printer, ChevronDown, ChevronRight } from "lucide-react";

const LOGO = "data:image/jpeg;base64,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";
const MONTH_NAMES = ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"];

const DT = [
  ["数学+専門科目（基礎）","初步确定目标校","初步确定研究方向","制定每个月的具体目标"],
  ["数学+専門科目（提高）","确定目标校","完成陶瓷信","完成研究计划","练习面试","联系教授拿内诺"],
  ["按志望校分班","狂刷过去问","知识点查缺补漏","提升面试能力","调整考试心态","准备面试西服"],
];

const PC = ["#364C84","#B08D3E","#6B8F3D"];
const PL = ["#E0E7F5","#F5EDD5","#E8F0CC"];
const PN = ["第一阶段","第二阶段","第三阶段"];
const PS = ["基礎固め","実力養成","志望校特訓"];
const TOT = 18, MW = 78, LW = 120, RH = 32, PRH = 36;

const fl = document.createElement("link");
fl.href = "https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700;900&display=swap";
fl.rel = "stylesheet";
document.head.appendChild(fl);

function gm(sy,sm,o){const m=(sm-1+o)%12,y=sy+Math.floor((sm-1+o)/12);return{s:`${m+1}月`,f:`${y}年${m+1}月`,y,m:m+1};}
function dist(names,ps,pe){const l=pe-ps+1;return names.map((n,i)=>{const s=ps+Math.floor(i*l/names.length),e=ps+Math.floor((i+1)*l/names.length)-1;return{name:n,start:s,end:Math.max(s,e)};});}
function yearSpans(sy,sm,count){const r=[];let cy=null,cs=0;for(let i=0;i<count;i++){const ml=gm(sy,sm,i);if(ml.y!==cy){if(cy!==null)r.push({y:cy,s:cs,c:i-cs});cy=ml.y;cs=i;}}if(cy!==null)r.push({y:cy,s:cs,c:count-cs});return r;}

function Bar({task,pi,mw,onUpdate,isPhase,ps,pe}){
  const dr=useRef(null);const c=PC[pi];
  const left=task.start*mw,w=(task.end-task.start+1)*mw;
  const down=(e,type)=>{e.preventDefault();e.stopPropagation();
    dr.current={type,sx:e.clientX,os:task.start,oe:task.end,mw};
    const move=(ev)=>{if(!dr.current)return;const{type:t,sx,os,oe,mw:m}=dr.current;const dm=Math.round((ev.clientX-sx)/m);
      let ns=os,ne=oe;const lo=isPhase?0:ps,hi=isPhase?TOT-1:pe;
      if(t==="l")ns=Math.max(lo,Math.min(oe,os+dm));
      else if(t==="r")ne=Math.min(hi,Math.max(os,oe+dm));
      else{const sp=oe-os;ns=Math.max(lo,Math.min(hi-sp,os+dm));ne=ns+sp;}
      onUpdate(ns,ne);};
    const up=()=>{dr.current=null;window.removeEventListener("pointermove",move);window.removeEventListener("pointerup",up);};
    window.addEventListener("pointermove",move);window.addEventListener("pointerup",up);};
  const h=isPhase?PRH-6:RH-8;
  return(
    <div style={{position:"absolute",left,width:Math.max(w,mw),top:isPhase?3:4,height:h,
      background:isPhase?`linear-gradient(135deg,${c},${c}cc)`:`${c}18`,
      border:isPhase?"none":`1.5px solid ${c}55`,borderRadius:isPhase?7:5,cursor:"grab",
      display:"flex",alignItems:"center",justifyContent:isPhase?"center":"flex-start",
      color:isPhase?"#fff":c,fontWeight:isPhase?700:600,fontSize:isPhase?12:10,
      userSelect:"none",boxShadow:isPhase?`0 2px 6px ${c}33`:"none",zIndex:isPhase?2:1,
      overflow:"hidden",whiteSpace:"nowrap",
    }} onPointerDown={(e)=>down(e,"m")}>
      <div style={{position:"absolute",left:0,top:0,bottom:0,width:10,cursor:"col-resize"}} onPointerDown={(e)=>down(e,"l")}/>
      <span style={{pointerEvents:"none",padding:isPhase?"0 14px":"0 14px",overflow:"hidden",textOverflow:"ellipsis"}}>
        {isPhase?(w>80?PN[pi]:`P${pi+1}`):task.name}
      </span>
      <div style={{position:"absolute",right:0,top:0,bottom:0,width:10,cursor:"col-resize"}} onPointerDown={(e)=>down(e,"r")}/>
    </div>);
}

function PhaseCard({phase,pi,onUT,sy,sm}){
  const[ed,setEd]=useState(null);const[et,setEt]=useState("");const[adding,setAdding]=useState(false);const[at,setAt]=useState("");
  const c=PC[pi],l=PL[pi],sl=gm(sy,sm,phase.start),el=gm(sy,sm,phase.end);
  const save=()=>{if(et.trim()){onUT(pi,phase.tasks.map((t,i)=>i===ed?{...t,name:et.trim()}:t));}setEd(null);};
  const del=(i)=>onUT(pi,phase.tasks.filter((_,j)=>j!==i));
  const add=()=>{if(at.trim()){onUT(pi,[...phase.tasks,{name:at.trim(),start:phase.start,end:Math.min(phase.start+1,phase.end)}]);setAt("");setAdding(false);}};
  return(
    <div style={{background:"#fff",borderRadius:12,border:`2px solid ${l}`,overflow:"hidden",boxShadow:"0 1px 3px rgba(0,0,0,0.05)",flex:1,minWidth:260}}>
      <div style={{background:`linear-gradient(135deg,${c},${c}cc)`,padding:"10px 14px",color:"#fff",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div><div style={{fontWeight:900,fontSize:14}}>{PN[pi]}</div><div style={{fontSize:10,opacity:0.8}}>{PS[pi]}</div></div>
        <div style={{display:"flex",alignItems:"center",gap:6}}>
          <div style={{background:"rgba(255,255,255,0.2)",borderRadius:16,padding:"2px 10px",fontSize:11,fontWeight:500}}>{sl.f} 〜 {el.f}</div>
          <button onClick={()=>setAdding(true)} title="添加任务" style={{width:22,height:22,borderRadius:"50%",border:"1.5px solid rgba(255,255,255,0.5)",background:"rgba(255,255,255,0.15)",color:"#fff",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,padding:0}}><Plus size={12}/></button>
        </div>
      </div>
      <div style={{padding:"8px 10px"}}>
        {phase.tasks.map((task,i)=>(
          <div key={i} style={{display:"flex",alignItems:"center",gap:6,padding:"5px 8px",borderRadius:6,marginBottom:2,background:i%2===0?l+"55":"transparent"}}>
            <div style={{width:18,height:18,borderRadius:"50%",background:c+"18",color:c,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:700,flexShrink:0}}>{i+1}</div>
            {ed===i?(
              <div style={{display:"flex",flex:1,gap:4}}>
                <input value={et} onChange={e=>setEt(e.target.value)} onKeyDown={e=>e.key==="Enter"&&save()} autoFocus style={{flex:1,padding:"2px 8px",border:`1.5px solid ${c}`,borderRadius:4,outline:"none",fontSize:12,fontFamily:"'Noto Sans JP',sans-serif"}}/>
                <button onClick={save} style={{background:c,color:"#fff",border:"none",borderRadius:4,padding:"2px 6px",cursor:"pointer",display:"flex",alignItems:"center"}}><Check size={12}/></button>
                <button onClick={()=>setEd(null)} style={{background:"#EDEDEA",border:"none",borderRadius:4,padding:"2px 6px",cursor:"pointer",display:"flex",alignItems:"center"}}><X size={12}/></button>
              </div>
            ):(
              <>
                <span style={{flex:1,fontSize:12,color:"#1e293b",lineHeight:1.3}}>{task.name}</span>
                <span style={{fontSize:10,color:"#94a3b8",flexShrink:0}}>{gm(sy,sm,task.start).s}〜{gm(sy,sm,task.end).s}</span>
                <button onClick={()=>{setEd(i);setEt(task.name);}} style={{background:"none",border:"none",cursor:"pointer",color:"#bfc9d4",padding:"1px 2px",display:"flex",alignItems:"center"}}><Pencil size={12}/></button>
                <button onClick={()=>del(i)} style={{background:"none",border:"none",cursor:"pointer",color:"#bfc9d4",padding:"1px 2px",display:"flex",alignItems:"center"}}><Trash2 size={12}/></button>
              </>
            )}
          </div>
        ))}
        {adding&&(
          <div style={{display:"flex",gap:4,marginTop:4,padding:"0 8px"}}>
            <input value={at} onChange={e=>setAt(e.target.value)} onKeyDown={e=>e.key==="Enter"&&add()} placeholder="任务内容..." autoFocus style={{flex:1,padding:"4px 8px",border:"1.5px solid #E8E8E0",borderRadius:4,outline:"none",fontSize:12,fontFamily:"'Noto Sans JP',sans-serif"}}/>
            <button onClick={add} style={{background:c,color:"#fff",border:"none",borderRadius:4,padding:"2px 10px",cursor:"pointer",fontSize:11,fontWeight:600,fontFamily:"'Noto Sans JP',sans-serif"}}>添加</button>
            <button onClick={()=>{setAdding(false);setAt("");}} style={{background:"#EDEDEA",border:"none",borderRadius:4,padding:"2px 8px",cursor:"pointer",fontSize:11,fontFamily:"'Noto Sans JP',sans-serif"}}>取消</button>
          </div>
        )}
      </div>
    </div>);
}

function Gantt({phases,sy,sm,onPR,onTR,coll,onTog}){
  const gw=TOT*MW;
  const labelRef=useRef(null);
  const bodyRef=useRef(null);
  const scrollRef=useRef(null);
  const [scrollPos,setScrollPos]=useState(0);
  const [maxScroll,setMaxScroll]=useState(1);
  const onBodyScroll=(e)=>{if(labelRef.current)labelRef.current.scrollTop=e.target.scrollTop;};
  const onLabelScroll=(e)=>{if(bodyRef.current)bodyRef.current.scrollTop=e.target.scrollTop;};
  const onHScroll=(e)=>{setScrollPos(e.target.scrollLeft);setMaxScroll(e.target.scrollWidth-e.target.clientWidth||1);};
  const scrollBy=(dx)=>{if(scrollRef.current)scrollRef.current.scrollBy({left:dx,behavior:"smooth"});};

  useEffect(()=>{
    if(scrollRef.current){
      setMaxScroll(scrollRef.current.scrollWidth-scrollRef.current.clientWidth||1);
    }
  },[phases,coll]);

  const rows=[];
  phases.forEach((p,pi)=>{rows.push({t:"p",pi,p});if(!coll[pi])p.tasks.forEach((tk,ti)=>rows.push({t:"tk",pi,ti,tk,ps:p.start,pe:p.end}));});
  const ys=yearSpans(sy,sm,TOT);
  const pct=maxScroll>0?scrollPos/maxScroll:0;

  return(
    <div>
      <div style={{display:"flex",border:"1px solid #E8E8E0",borderRadius:10,overflow:"hidden",background:"#fff",boxShadow:"0 1px 4px rgba(0,0,0,0.05)"}}>
        <div style={{width:LW,flexShrink:0,borderRight:"2px solid #E8E8E0",background:"#FFFDF5",display:"flex",flexDirection:"column"}}>
          <div style={{height:50,borderBottom:"1px solid #E8E8E0",display:"flex",alignItems:"flex-end",padding:"0 8px 4px",fontSize:10,fontWeight:600,color:"#94a3b8",flexShrink:0}}>任务</div>
          <div ref={labelRef} onScroll={onLabelScroll} style={{overflowX:"hidden"}}>
            <div>
              {rows.map((r,ri)=>{
                if(r.t==="p")return(
                  <div key={`p${r.pi}`} onClick={()=>onTog(r.pi)} style={{height:PRH,display:"flex",alignItems:"center",gap:4,padding:"0 6px",cursor:"pointer",background:PL[r.pi],borderBottom:"1px solid #E8E8E0",userSelect:"none"}}>
                    {coll[r.pi]?<ChevronRight size={12} color={PC[r.pi]}/>:<ChevronDown size={12} color={PC[r.pi]}/>}
                    <div style={{width:6,height:6,borderRadius:1,background:PC[r.pi],flexShrink:0}}/>
                    <span style={{fontSize:11,fontWeight:700,color:PC[r.pi],overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{PN[r.pi]}</span>
                  </div>);
                return(
                  <div key={`t${r.pi}-${r.ti}`} style={{height:RH,display:"flex",alignItems:"center",padding:"0 4px 0 18px",borderBottom:"1px solid #FAFAF5",background:r.ti%2===0?"#fff":"#fafbfc"}}>
                    <span style={{fontSize:10,color:"#64748b",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",textAlign:"left",width:"100%"}}>{r.tk.name}</span>
                  </div>);
              })}
            </div>
          </div>
        </div>
        <div ref={scrollRef} onScroll={onHScroll} style={{flex:1,overflowX:"auto"}}>
          <div style={{width:gw,minWidth:gw}}>
            <div style={{display:"flex",height:22}}>
              {ys.map((y,i)=>(<div key={i} style={{width:y.c*MW,flexShrink:0,textAlign:"center",fontSize:11,fontWeight:700,color:"#475569",display:"flex",alignItems:"center",justifyContent:"center",borderLeft:i>0?"2px solid #D8D8D0":"none",background:i%2===0?"#FFFDF5":"#E8EDF8"}}>{y.y}年</div>))}
            </div>
            <div style={{display:"flex",height:28,borderBottom:"1px solid #E8E8E0"}}>
              {Array.from({length:TOT},(_,i)=>{const ml=gm(sy,sm,i);const ny=i>0&&ml.m===1;return(
                <div key={i} style={{width:MW,flexShrink:0,textAlign:"center",borderLeft:ny?"2px solid #D8D8D0":i>0?"1px solid #F2F2EC":"none",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,color:"#475569",fontWeight:500}}>{ml.m}月</div>
              );})}
            </div>
            <div ref={bodyRef} onScroll={onBodyScroll}>
              {rows.map((r,ri)=>{
                const h=r.t==="p"?PRH:RH;
                return(
                  <div key={ri} style={{position:"relative",height:h,borderBottom:"1px solid #FAFAF5"}}>
                    <div style={{position:"absolute",inset:0,display:"flex",pointerEvents:"none"}}>
                      {Array.from({length:TOT},(_,j)=>{const ml=gm(sy,sm,j);const ny=j>0&&ml.m===1;return(
                        <div key={j} style={{width:MW,flexShrink:0,borderLeft:ny?"2px solid #D8D8D022":j>0?"1px solid #FAFAF5":"none",background:r.t==="p"?PL[r.pi]+"66":(j%2===0?"#fcfcfd":"transparent")}}/>
                      );})}
                    </div>
                    {r.t==="p"?
                      <Bar task={{start:r.p.start,end:r.p.end,name:PN[r.pi]}} pi={r.pi} mw={MW} isPhase onUpdate={(ns,ne)=>onPR(r.pi,ns,ne)}/>:
                      <Bar task={r.tk} pi={r.pi} mw={MW} isPhase={false} ps={r.ps} pe={r.pe} onUpdate={(ns,ne)=>onTR(r.pi,r.ti,ns,ne)}/>}
                  </div>);
              })}
            </div>
          </div>
        </div>
      </div>
      {/* Custom draggable scrollbar */}
      <div style={{display:"flex",alignItems:"center",gap:8,marginTop:8,paddingLeft:LW+4}}>
        <button onClick={()=>scrollBy(-MW*3)} style={{width:28,height:28,borderRadius:6,border:"1px solid #E8E8E0",background:"#fff",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",color:"#64748b",fontSize:14,flexShrink:0}}>←</button>
        <div style={{flex:1,height:12,background:"#E8E8E0",borderRadius:6,position:"relative",cursor:"pointer"}}
          onClick={(e)=>{
            const rect=e.currentTarget.getBoundingClientRect();
            const clickPct=(e.clientX-rect.left)/rect.width;
            if(scrollRef.current)scrollRef.current.scrollLeft=clickPct*maxScroll;
          }}>
          <div style={{position:"absolute",top:0,bottom:0,left:`${pct*70}%`,width:"30%",background:"linear-gradient(90deg,#94a3b8,#64748b)",borderRadius:6,cursor:"grab"}}
            onPointerDown={(e)=>{
              e.preventDefault();e.stopPropagation();
              const track=e.currentTarget.parentElement;
              const trackRect=track.getBoundingClientRect();
              const thumbStartLeft=parseFloat(e.currentTarget.style.left)||0;
              const startX=e.clientX;
              const onMove=(ev)=>{
                const dx=ev.clientX-startX;
                const trackW=trackRect.width;
                const dPct=dx/trackW/0.7;
                const newPct=Math.max(0,Math.min(1,(pct||0)+dPct));
                if(scrollRef.current)scrollRef.current.scrollLeft=newPct*maxScroll;
              };
              const onUp=()=>{window.removeEventListener("pointermove",onMove);window.removeEventListener("pointerup",onUp);};
              window.addEventListener("pointermove",onMove);
              window.addEventListener("pointerup",onUp);
            }}/>
        </div>
        <button onClick={()=>scrollBy(MW*3)} style={{width:28,height:28,borderRadius:6,border:"1px solid #E8E8E0",background:"#fff",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",color:"#64748b",fontSize:14,flexShrink:0}}>→</button>
      </div>
    </div>);
}

function Preview({sn,sy,sm,phases,onBack}){
  const mw=26,mx=Math.max(14,phases[2].end+2);
  const ys=yearSpans(sy,sm,mx);
  return(
    <div style={{fontFamily:"'Noto Sans JP',sans-serif",background:"#FAFAF5",minHeight:"100vh",padding:24}}>
      <div style={{maxWidth:900,margin:"0 auto"}}>
        <div className="no-print" style={{display:"flex",gap:12,marginBottom:20,justifyContent:"center"}}>
          <button onClick={onBack} style={{background:"#fff",border:"1px solid #E8E8E0",borderRadius:8,padding:"8px 20px",cursor:"pointer",fontSize:14,color:"#475569",fontFamily:"'Noto Sans JP',sans-serif",fontWeight:500,display:"flex",alignItems:"center",gap:6}}><ArrowLeft size={16}/> 返回编辑</button>
          <button onClick={()=>window.print()} style={{background:"#364C84",color:"#fff",border:"none",borderRadius:8,padding:"8px 24px",cursor:"pointer",fontSize:14,fontWeight:700,fontFamily:"'Noto Sans JP',sans-serif",boxShadow:"0 2px 8px rgba(30,58,110,0.3)",display:"flex",alignItems:"center",gap:6}}><Printer size={16}/> 打印 / 保存PDF</button>
        </div>
        <div id="print-area" style={{background:"#fff",borderRadius:16,boxShadow:"0 4px 24px rgba(0,0,0,0.08)",overflow:"hidden",padding:"40px 36px"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
            <div style={{fontSize:11,letterSpacing:3,color:"#94a3b8",fontWeight:500}}>WASEDA SCI-TECH</div>
            <img src={LOGO} alt="早稲田理工塾" style={{height:36,objectFit:"contain"}}/>
          </div>
          <div style={{height:3,background:"linear-gradient(90deg,#364C84,#B08D3E,#6B8F3D)",borderRadius:2,marginBottom:28}}/>
          <div style={{textAlign:"center",marginBottom:32}}>
            <div style={{fontSize:26,fontWeight:900,color:"#1e293b",marginBottom:6}}>考学規画書</div>
            <div style={{fontSize:13,color:"#64748b",marginBottom:16}}>不需要你有多聪明，坚持到底才是胜利</div>
            <div style={{display:"inline-flex",gap:24,background:"#FFFDF5",borderRadius:12,padding:"10px 28px",border:"1px solid #E8E8E0"}}>
              <div style={{textAlign:"left"}}><div style={{fontSize:10,color:"#94a3b8",marginBottom:1}}>学生姓名</div><div style={{fontSize:15,fontWeight:700,color:"#1e293b"}}>{sn}</div></div>
              <div style={{width:1,background:"#E8E8E0"}}/>
              <div style={{textAlign:"left"}}><div style={{fontSize:10,color:"#94a3b8",marginBottom:1}}>规划期间</div><div style={{fontSize:15,fontWeight:700,color:"#1e293b"}}>{gm(sy,sm,phases[0].start).f} 〜 {gm(sy,sm,phases[2].end).f}</div></div>
            </div>
          </div>
          <div style={{position:"relative",padding:"0 16px",marginBottom:28}}>
            <div style={{position:"absolute",left:35,top:0,bottom:0,width:3,background:"#E8E8E0",borderRadius:2}}/>
            {phases.map((ph,pi)=>{const sl=gm(sy,sm,ph.start),el=gm(sy,sm,ph.end);return(
              <div key={pi} style={{position:"relative",marginBottom:22,paddingLeft:52}}>
                <div style={{position:"absolute",left:22,top:6,width:26,height:26,borderRadius:"50%",background:PC[pi],color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:900,zIndex:1,boxShadow:`0 2px 6px ${PC[pi]}44`}}>{pi+1}</div>
                <div style={{background:PL[pi],borderRadius:10,padding:"12px 14px",borderLeft:`4px solid ${PC[pi]}`}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8,flexWrap:"wrap",gap:4}}>
                    <div><span style={{fontWeight:900,fontSize:14,color:PC[pi]}}>{PN[pi]}</span><span style={{fontSize:10,color:"#64748b",marginLeft:6}}>{PS[pi]}</span></div>
                    <span style={{fontSize:10,color:PC[pi],fontWeight:600,background:"#fff",padding:"2px 8px",borderRadius:10}}>{sl.f} 〜 {el.f}</span>
                  </div>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"4px 12px"}}>
                    {ph.tasks.map((tk,ti)=>(
                      <div key={ti} style={{display:"flex",alignItems:"center",gap:6,fontSize:11,color:"#334155"}}>
                        <div style={{width:4,height:4,borderRadius:"50%",background:PC[pi],flexShrink:0}}/>
                        <span style={{flex:1}}>{tk.name}</span>
                        <span style={{fontSize:9,color:"#94a3b8",flexShrink:0}}>{gm(sy,sm,tk.start).s}〜{gm(sy,sm,tk.end).s}</span>
                      </div>))}
                  </div>
                </div>
              </div>);})}
          </div>
          <div style={{background:"#FFFDF5",borderRadius:10,padding:"14px 12px",border:"1px solid #E8E8E0",overflowX:"auto"}}>
            <div style={{fontSize:11,fontWeight:700,color:"#475569",marginBottom:8}}>月度规划总览</div>
            <div style={{minWidth:480}}>
              <div style={{display:"flex",paddingLeft:60,marginBottom:1}}>
                {ys.map((y,i)=>(<div key={i} style={{width:y.c*mw,textAlign:"center",fontSize:10,fontWeight:700,color:"#475569",borderLeft:i>0?"1.5px solid #D8D8D0":"none"}}>{y.y}年</div>))}
              </div>
              <div style={{display:"flex",marginBottom:3,paddingLeft:60}}>
                {Array.from({length:mx},(_,i)=>(<div key={i} style={{width:mw,flexShrink:0,textAlign:"center",fontSize:9,color:"#64748b",fontWeight:500}}>{gm(sy,sm,i).m}月</div>))}
              </div>
              {phases.map((ph,pi)=>(
                <div key={pi} style={{marginBottom:1}}>
                  <div style={{display:"flex",alignItems:"center",height:16}}>
                    <div style={{width:60,fontSize:8,fontWeight:700,color:PC[pi],paddingRight:4,textAlign:"right",flexShrink:0}}>{PN[pi]}</div>
                    <div style={{flex:1,display:"flex"}}>{Array.from({length:mx},(_,i)=>{const ins=i>=ph.start&&i<=ph.end;return(<div key={i} style={{width:mw,flexShrink:0,height:12,background:ins?PC[pi]:"transparent",borderRadius:i===ph.start?"2px 0 0 2px":i===ph.end?"0 2px 2px 0":0,opacity:0.75}}/>);})}</div>
                  </div>
                  {ph.tasks.map((tk,ti)=>(
                    <div key={ti} style={{display:"flex",alignItems:"center",height:13}}>
                      <div style={{width:60,fontSize:7,color:"#64748b",paddingRight:4,textAlign:"right",flexShrink:0,overflow:"hidden",whiteSpace:"nowrap",textOverflow:"ellipsis"}}>{tk.name}</div>
                      <div style={{flex:1,display:"flex"}}>{Array.from({length:mx},(_,i)=>{const ins=i>=tk.start&&i<=tk.end;return(<div key={i} style={{width:mw,flexShrink:0,height:8,background:ins?PC[pi]+"44":"transparent",borderRadius:i===tk.start?"1px 0 0 1px":i===tk.end?"0 1px 1px 0":0,borderTop:ins?`1.5px solid ${PC[pi]}88`:"1.5px solid transparent",borderBottom:ins?`1.5px solid ${PC[pi]}88`:"1.5px solid transparent"}}/>);})}</div>
                    </div>))}
                </div>))}
            </div>
          </div>
          <div style={{textAlign:"center",marginTop:24,fontSize:10,color:"#94a3b8"}}>早稲田理工塾 WASEDA Sci-tech ｜ 一起走向理想的大学院</div>
        </div>
      </div>
    </div>);
}

export default function App(){
  const[step,setStep]=useState("input");
  const[sn,setSn]=useState("");
  const[sy,setSy]=useState(2026);
  const[sm,setSm]=useState(4);
  const[phases,setPhases]=useState(null);
  const[prev,setPrev]=useState(false);
  const[coll,setColl]=useState([false,false,false]);

  const gen=()=>{if(!sn.trim())return;setPhases([
    {start:0,end:4,tasks:dist(DT[0],0,4)},
    {start:5,end:9,tasks:dist(DT[1],5,9)},
    {start:10,end:14,tasks:dist(DT[2],10,14)},
  ]);setStep("edit");};

  const uPR=useCallback((pi,ns,ne)=>{setPhases(p=>p.map((ph,i)=>{if(i!==pi)return ph;const tasks=ph.tasks.map(t=>({...t,start:Math.max(ns,Math.min(ne,t.start)),end:Math.min(ne,Math.max(ns,t.end))}));return{...ph,start:ns,end:ne,tasks};}));},[]);
  const uTR=useCallback((pi,ti,ns,ne)=>{setPhases(p=>p.map((ph,i)=>i!==pi?ph:{...ph,tasks:ph.tasks.map((t,j)=>j===ti?{...t,start:ns,end:ne}:t)}));},[]);
  const uT=useCallback((pi,tasks)=>{setPhases(p=>p.map((ph,i)=>i===pi?{...ph,tasks}:ph));},[]);

  useEffect(()=>{const s=document.createElement("style");s.id="pp-s";
    s.textContent=`@media print{*{-webkit-print-color-adjust:exact!important;print-color-adjust:exact!important}.no-print{display:none!important}body,html{background:#fff!important}#print-area{box-shadow:none!important;border-radius:0!important;padding:20px!important}#print-area *{break-inside:avoid}@page{margin:10mm;size:A4}}`;
    document.head.appendChild(s);return()=>{const e=document.getElementById("pp-s");if(e)e.remove();};},[]);

  if(prev&&phases) return (<Preview sn={sn} sy={sy} sm={sm} phases={phases} onBack={()=>setPrev(false)}/>);

  if(step==="input")return(
    <div style={{fontFamily:"'Noto Sans JP',sans-serif",background:"#FFFDF5",minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",padding:24}}>
      <div style={{background:"#fff",borderRadius:20,padding:"48px 40px",boxShadow:"0 8px 32px rgba(0,0,0,0.08)",maxWidth:460,width:"100%",border:"1px solid #E8E8E0"}}>
        <div style={{textAlign:"center",marginBottom:36}}>
          <img src={LOGO} alt="早稲田理工塾" style={{height:64,objectFit:"contain",marginBottom:14,display:"block",margin:"0 auto 14px auto"}}/>
          <div style={{fontSize:18,fontWeight:700,color:"#475569",letterSpacing:2}}>考学規画書</div>
        </div>
        <div style={{marginBottom:20}}>
          <label style={{fontSize:13,fontWeight:600,color:"#475569",marginBottom:6,display:"flex",alignItems:"center",gap:6}}><User size={14}/> 学生姓名</label>
          <input value={sn} onChange={e=>setSn(e.target.value)} onKeyDown={e=>e.key==="Enter"&&gen()} placeholder="请输入学生姓名"
            style={{width:"100%",padding:"12px 16px",borderRadius:10,border:"2px solid #E8E8E0",outline:"none",fontSize:15,fontFamily:"'Noto Sans JP',sans-serif",boxSizing:"border-box"}}
            onFocus={e=>e.target.style.borderColor="#364C84"} onBlur={e=>e.target.style.borderColor="#E8E8E0"}/>
        </div>
        <div style={{display:"flex",gap:12,marginBottom:28}}>
          <div style={{flex:1}}>
            <label style={{fontSize:13,fontWeight:600,color:"#475569",marginBottom:6,display:"flex",alignItems:"center",gap:6}}><Calendar size={14}/> 开始年份</label>
            <select value={sy} onChange={e=>setSy(Number(e.target.value))} style={{width:"100%",padding:"12px 16px",borderRadius:10,border:"2px solid #E8E8E0",outline:"none",fontSize:15,fontFamily:"'Noto Sans JP',sans-serif",background:"#fff",cursor:"pointer",boxSizing:"border-box"}}>
              {[2025,2026,2027,2028].map(y=><option key={y} value={y}>{y}年</option>)}
            </select>
          </div>
          <div style={{flex:1}}>
            <label style={{fontSize:13,fontWeight:600,color:"#475569",marginBottom:6,display:"block"}}>月份</label>
            <select value={sm} onChange={e=>setSm(Number(e.target.value))} style={{width:"100%",padding:"12px 16px",borderRadius:10,border:"2px solid #E8E8E0",outline:"none",fontSize:15,fontFamily:"'Noto Sans JP',sans-serif",background:"#fff",cursor:"pointer",boxSizing:"border-box"}}>
              {MONTH_NAMES.map((m,i)=><option key={i} value={i+1}>{m}</option>)}
            </select>
          </div>
        </div>
        <button onClick={gen} disabled={!sn.trim()} style={{width:"100%",padding:"14px",background:sn.trim()?"#364C84":"#D8D8D0",color:"#fff",border:"none",borderRadius:12,fontSize:16,fontWeight:700,cursor:sn.trim()?"pointer":"not-allowed",fontFamily:"'Noto Sans JP',sans-serif",boxShadow:sn.trim()?"0 4px 16px rgba(30,58,110,0.3)":"none"}}>
          規画
        </button>
      </div>
    </div>);

  return(
    <div style={{fontFamily:"'Noto Sans JP',sans-serif",background:"#FFFDF5",minHeight:"100vh",padding:"20px 20px 60px"}}>
      <div style={{maxWidth:1100,margin:"0 auto"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20,flexWrap:"wrap",gap:10}}>
          <div style={{display:"flex",alignItems:"center",gap:12}}>
            <button onClick={()=>setStep("input")} style={{background:"#fff",border:"1px solid #E8E8E0",borderRadius:8,padding:"6px 12px",cursor:"pointer",fontSize:12,color:"#64748b",fontFamily:"'Noto Sans JP',sans-serif",display:"flex",alignItems:"center",gap:4}}><ArrowLeft size={14}/> 返回</button>
            <img src={LOGO} alt="logo" style={{height:40,objectFit:"contain"}}/>
            <div>
              <div style={{fontSize:17,fontWeight:900,color:"#1e293b"}}>{sn} 的考学規画</div>
            </div>
          </div>
          <div style={{display:"flex",gap:8}}>
            <button onClick={()=>setPrev(true)} style={{background:"#fff",border:"1px solid #E8E8E0",borderRadius:8,padding:"7px 16px",cursor:"pointer",fontSize:12,fontWeight:600,color:"#475569",fontFamily:"'Noto Sans JP',sans-serif",display:"flex",alignItems:"center",gap:5}}><Eye size={14}/> 预览</button>
            <button onClick={()=>setPrev(true)} style={{background:"#364C84",color:"#fff",border:"none",borderRadius:8,padding:"7px 18px",cursor:"pointer",fontSize:12,fontWeight:700,fontFamily:"'Noto Sans JP',sans-serif",boxShadow:"0 2px 8px rgba(30,58,110,0.3)",display:"flex",alignItems:"center",gap:5}}><FileText size={14}/> 导出PDF</button>
          </div>
        </div>
        {phases&&(
          <div style={{display:"flex",gap:12,marginBottom:20,flexWrap:"wrap"}}>
            {phases.map((ph,i)=>(<PhaseCard key={i} phase={ph} pi={i} onUT={uT} sy={sy} sm={sm}/>))}
          </div>
        )}
        {phases&&(
          <div>
            <Gantt phases={phases} sy={sy} sm={sm} onPR={uPR} onTR={uTR} coll={coll} onTog={(pi)=>setColl(c=>c.map((v,i)=>i===pi?!v:v))}/>
            <div style={{marginTop:8,display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap"}}>
              {PN.map((n,i)=>(
                <div key={i} style={{display:"flex",alignItems:"center",gap:4,fontSize:11,color:"#64748b"}}>
                  <div style={{width:10,height:10,borderRadius:2,background:PC[i]}}/>
                  {n}{phases&&<span style={{color:"#94a3b8"}}>({gm(sy,sm,phases[i].start).s}〜{gm(sy,sm,phases[i].end).s})</span>}
                </div>))}
            </div>
          </div>
        )}
      </div>
    </div>);
}
