// 80 authored fictional messages across 16 situations. No runtime AI generation.
const clues={
 secret:['A secret that should stay secret.','Never send login codes, passwords, or card secrets in a message reply. Verify through the service’s known app.'],
 rush:['The clock is part of the pitch.','A deadline or threat can push you to skip verification. Check independently before acting.'],
 pay:['Money before proof.','An unexpected payment request deserves independent verification. Small fees can be bait for card details.'],
 link:['A destination to question.','This destination is not verified. Open the known app or type the real website yourself.'],
 prize:['An unexpected windfall.','Unexpected rewards and guaranteed profits can be bait. A promise is not proof.'],
 device:['Your device is the target.','Unsolicited remote access or software requests can expose your accounts. Contact support independently.'],
 secretive:['Why the secrecy?','Secrecy can isolate you from someone who would help you question the request.'],
 context:['Context, not a certificate.','No obvious request for money, secrets, or rushed action appears here. Familiar context alone does not verify identity.']
};
const groups=[
 ['The helpful stranger.','Support team','SUPPORT / SMS',true,[
 'We noticed an unusual login. [[Send us your OTP|secret]] so we can secure your account. Respond [[within 10 minutes|rush]] or access will be suspended.',
 'Your profile needs a security reset. Please [[reply with your password|secret]] so our support agent can complete it. This is your [[final warning|rush]].',
 'A device has tried to enter your account. [[Forward the verification code|secret]] to this chat so we can block it. [[Act now|rush]].',
 'This is the account safety desk. [[Send your PIN|secret]] to confirm ownership. Your account will be [[locked in 15 minutes|rush]].',
 'We are upgrading account protection. [[Share the one-time code|secret]] you just received. Please complete this [[immediately|rush]] to avoid deactivation.'
 ]],
 ['The parcel plot twist.','Delivery desk','DELIVERY / SMS',true,[
 'We could not deliver your parcel. [[Pay RM2.50|pay]] at [[parcel-redelivery.example|link]] or it will be returned [[today|rush]].',
 'Your package is at our depot. A [[RM4 handling fee|pay]] is due. Enter card details at [[depot-release.example|link]] to release it.',
 'Address incomplete. [[Pay a correction fee|pay]] at [[address-update.example|link]] [[within 30 minutes|rush]] to keep your delivery slot.',
 'Customs clearance is pending. [[Transfer RM12|pay]] to our agent now. Use [[customs-pay.example|link]] before the parcel is disposed of.',
 'Your delivery is held for unpaid postage. [[Settle RM3.20|pay]] via [[postage-fix.example|link]]. This is the [[last notice|rush]].'
 ]],
 ['You won! (Did you?)','Rewards desk','PRIZE / EMAIL',true,[
 'Congratulations! You [[won RM5,000|prize]]. Send a [[RM50 processing fee|pay]] to claim. [[Keep this secret|secretive]] until payment arrives.',
 'Your number was picked for a [[free phone prize|prize]]. Cover the [[RM30 insurance fee|pay]] at [[prize-dispatch.example|link]].',
 'We selected you for a [[RM2,000 cash reward|prize]]. [[Send your bank login|secret]] so we can transfer it. Offer ends [[tonight|rush]].',
 'You are our [[lucky lottery winner|prize]]. [[Pay the release fee|pay]] to activate your winnings. Do not tell anyone until the draw is announced.',
 'A surprise gift awaits! [[Claim your free laptop|prize]] after a [[RM25 delivery payment|pay]]. Visit [[winner-claim.example|link]].'
 ]],
 ['The money machine.','Wealth mentor','INVESTMENT / CHAT',true,[
 'Our group offers [[guaranteed RM800 daily profit|prize]]. [[Deposit RM100|pay]] to activate. [[Last chance — act now|rush]]!',
 'Earn [[risk-free returns of 20% a week|prize]]. [[Transfer RM500|pay]] to our personal account to join the private trading pool.',
 'Our secret bot [[doubles your money overnight|prize]]. [[Send crypto|pay]] to unlock it. [[Keep this secret|secretive]] from other investors.',
 'I can turn your savings into [[guaranteed profits|prize]]. [[Pay the membership deposit|pay]] before the group closes [[in 10 minutes|rush]].',
 'No experience needed. Get [[RM3,000 every day, guaranteed|prize]]. [[Send a RM200 activation payment|pay]] to receive your first withdrawal.'
 ]],
 ['The dream job detour.','Recruitment agent','JOBS / CHAT',true,[
 'You have the job! No interview needed. [[Pay RM80 for training materials|pay]] to secure your place. [[Decide today|rush]].',
 'Work from home reviewing products. [[Deposit RM150|pay]] to unlock paid tasks, then withdraw your salary immediately.',
 'Your offer is approved. For payroll setup, [[send your banking password|secret]] to our hiring agent. The position expires [[tonight|rush]].',
 'We pay RM300 per hour for simple clicks. [[Send the equipment registration fee|pay]] before we issue your contract.',
 'Welcome aboard! [[Install this remote access app|device]] and log into your bank so HR can verify your salary account.'
 ]],
 ['The marketplace manoeuvre.','Interested buyer','MARKETPLACE / CHAT',true,[
 'I paid for your item. To receive the funds, [[enter your card number and CVV|secret]] at [[seller-release.example|link]].',
 'Our courier will collect it. [[Pay the pickup insurance|pay]] first and I will reimburse you. Use [[buyer-courier.example|link]].',
 'Your sale is pending. [[Share the OTP|secret]] sent to your phone so I can complete payment. [[Hurry|rush]], I have another seller waiting.',
 'I sent too much money by mistake. [[Transfer the difference back|pay]] now; the payment screenshot proves it. No need to check your account.',
 'Your seller wallet must be upgraded. [[Pay RM100|pay]] to unlock my payment at [[wallet-upgrade.example|link]].'
 ]],
 ['The helpful technician.','Technical support','DEVICE / CALL FOLLOW-UP',true,[
 'Your computer is infected. [[Install AnyDesk|device]] and give us the access code so our unsolicited support team can repair it.',
 'We detected dangerous software. [[Share your screen|device]] while opening your bank app so we can remove the threat.',
 'This is the refund department. [[Allow remote access|device]] to your laptop and sign in to your banking page to receive the refund.',
 'A security scan is required. [[Install this app|device]] from [[security-cleaner.example|link]] and disable your protection tools.',
 'We can stop an account breach. [[Send your recovery phrase|secret]] to our technician so the wallet can be restored safely.'
 ]],
 ['The secret favour.','A familiar-looking contact','IMPERSONATION / CHAT',true,[
 'It’s your manager. In a meeting, cannot call. [[Buy gift cards|pay]] and send me the codes. [[Keep this between us|secretive]].',
 'Hi, I changed numbers. I need an [[urgent money transfer|pay]] before I can explain. [[Do not call me|rush]], just send it.',
 'This is a confidential police investigation. [[Move your savings to a safe account|pay]]. [[Do not tell anyone|secretive]].',
 'Your relative needs help. [[Send RM1,000|pay]] to this new account [[immediately|rush]]. There is no time to check with them.',
 'I’m buying team gifts. [[Send gift-card codes|pay]] to this chat. [[Keep it secret|secretive]] and do it before the meeting starts.'
 ]],
 ['The lunch committee.','A friend','EVERYDAY / CHAT',false,[
 'Lunch at [[the same café as last week|context]] tomorrow? I can make 12:30. No worries if another day works better.',
 'Fancy noodles after work? [[Our usual place|context]] has a new menu. Let me know when you finish.',
 'I booked a table for four at 7. [[The restaurant we picked yesterday|context]]. We can change the time if needed.',
 'Coffee on Saturday? [[Near the bookshop we visited|context]]. I’ll bring the novel I promised you.',
 'Picnic this weekend? [[The park from our group plan|context]] should be quieter in the morning. Bring whatever you like.'
 ]],
 ['The appointment reminder.','Appointment desk','APPOINTMENT / SMS',false,[
 'Reminder: your appointment is Thursday at 10. If you need to reschedule, [[use the number on your original booking|context]].',
 'Your haircut is booked for 3 tomorrow. [[No reply is required|context]] if the time still suits you.',
 'The service team will arrive between 2 and 4. Check details [[in the booking you already made|context]].',
 'Your consultation is on Monday at 9. Please bring the paperwork [[listed in your original confirmation|context]].',
 'A reminder for your eye test at 11 on Friday. [[Contact the branch directly|context]] if you need another time.'
 ]],
 ['The delivery update.','Order updates','DELIVERY / SMS',false,[
 'Your parcel is out for delivery. You can check progress [[in the shopping app you used|context]]. No payment is requested.',
 'Your order has shipped. Tracking details are available [[in your existing order history|context]].',
 'Delivery was attempted while you were out. Please check [[the collection slip left at your address|context]] for next steps.',
 'Your groceries are on the way. The driver will follow [[the instructions in your original order|context]].',
 'Your package is ready for collection at the locker [[shown in your order details|context]]. Check the app for the collection instructions.'
 ]],
 ['The meeting shuffle.','A teammate','WORK / EMAIL',false,[
 'Can we move tomorrow’s catch-up to 2? I have updated [[our existing calendar invitation|context]].',
 'The project review is in Room B today. [[The agenda is unchanged|context]]. Bring your notes if you have them.',
 'Thanks for the draft. I added comments [[in the document we already share|context]]. No rush on the revisions.',
 'The team lunch is postponed until Friday. [[We’ll discuss options at our usual stand-up|context]].',
 'I will be away in the morning. Can we review the slides [[after our regular team meeting|context]]?'
 ]],
 ['The community notice.','Community organiser','COMMUNITY / CHAT',false,[
 'The weekend clean-up starts at 8 by the park entrance. [[Bring gloves if you have them|context]]. Everyone is welcome.',
 'Book club is on Sunday. [[Same room as last month|context]]. We are discussing the first three chapters.',
 'The neighbourhood potluck starts at 6. [[Bring a dish if you can|context]], or just come along.',
 'The community garden session is cancelled because of rain. [[We’ll decide a new date next week|context]].',
 'Board-game night is Friday at the library. [[No registration fee|context]]. We have spare games if you want to try one.'
 ]],
 ['The class notice.','Course organiser','LEARNING / EMAIL',false,[
 'Your workshop starts at 10. Materials are available [[in the learning portal you enrolled through|context]].',
 'The lesson recording is now available [[in your existing course account|context]]. Watch whenever you have time.',
 'A reminder to bring a notebook to Saturday’s class. [[The location is unchanged|context]].',
 'Office hours move to Wednesday this week. Details are [[on the course noticeboard|context]].',
 'Thanks for attending the session. You can find the slides [[in the folder announced during class|context]].'
 ]],
 ['The booking confirmation.','Reservations desk','BOOKING / EMAIL',false,[
 'Your table for two is confirmed for 7 on Friday. [[No further action is needed|context]]. We look forward to seeing you.',
 'Your library room booking is confirmed. Please check in [[at the front desk on arrival|context]].',
 'Your museum tickets are reserved for Saturday. View them [[in the account you used to book|context]].',
 'Your bicycle service booking is confirmed. [[Bring the bike at the agreed time|context]]. We’ll discuss any work before proceeding.',
 'Your community hall reservation is confirmed. [[The details match your original booking|context]]. Contact reception if anything changes.'
 ]],
 ['The ordinary account notice.','Account notifications','ACCOUNT / EMAIL',false,[
 'Your monthly statement is ready. View it [[in the official app you already use|context]]. This message does not request a reply.',
 'Your display-name change was saved. [[No action is needed|context]] if you made this change.',
 'Your subscription preferences were updated. Review them [[through your usual account settings|context]].',
 'Your document export is ready [[inside your existing account|context]]. Open the app directly to access it.',
 'Your support request has been received. You can follow its progress [[in the support centre within the app|context]].'
 ]]
];
export const CASE_BANK=groups.flatMap(([title,sender,category,suspicious,messages],g)=>messages.map((message,v)=>{const parts=[];let at=0;for(const m of message.matchAll(/\[\[([^|]+)\|([^\]]+)\]\]/g)){parts.push(message.slice(at,m.index));const [heading,why]=clues[m[2]];parts.push({text:m[1],clue:{id:m[2],title:heading,quotes:[m[1]],why}});at=m.index+m[0].length;}parts.push(message.slice(at));return {id:`case-${g+1}-${v+1}`,title,subtitle:message.replace(/\[\[([^|]+)\|[^\]]+\]\]/g,'$1').slice(0,46)+'…',category,sender,detail:'Fictional practice message · Unverified sender',avatar:sender[0],channel:category.split(' / ')[1],suspicious,parts,explanation:suspicious?'Warning signs deserve a pause. '+[...new Set(parts.filter(p=>typeof p!=='string').map(p=>p.clue.why))].join(' '):'No obvious warning signs appear in this message. This is not proof of authenticity. If the sender or situation is unfamiliar, verify through a contact or app you already know.'};}));
export function shuffle(items,random=()=>crypto.getRandomValues(new Uint32Array(1))[0]/4294967296){const a=[...items];for(let i=a.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
export function drawRound(used=new Set(),random){const available=CASE_BANK.filter(c=>!used.has(c.id));if(available.filter(c=>c.suspicious).length<4||available.filter(c=>!c.suspicious).length<4){used.clear();return drawRound(used,random);}const selected=shuffle([true,false].flatMap(flag=>pickVaried(available.filter(c=>c.suspicious===flag),random)),random);selected.forEach(c=>used.add(c.id));return selected;}
export function scoreAnswer(correct,remainingMs){return correct?100+Math.max(0,Math.min(40,Math.ceil(remainingMs/500))):0;}

function pickVaried(available,random){const pool=shuffle(available,random),selected=[],groups=new Set();for(const c of pool){const group=c.id.split('-')[1];if(!groups.has(group)){selected.push(c);groups.add(group);}if(selected.length===4)return selected;}return selected.concat(pool.filter(c=>!selected.includes(c)).slice(0,4-selected.length));}
