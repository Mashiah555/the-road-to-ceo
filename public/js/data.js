// Hierarchy of ranks
const rankHierarchy = [
    "מועמד לעבודה",
    "עובד זוטר",
    "ראש צוות",
    "מנהל מחלקה",
    "סמנכ\"ל",
    "מנכ\"ל"
];

// --- Scenario Database ---
const scenarios = {
    "interview": {
        text: "אתם מגיעים לראיון עבודה ונשאלים שאלה חסרת טאקט שלדעתכם לא אמורה להישאל (למשל לגבי תכנון משפחה).",
        options: [
            {
                text: "לענות בחוסר נוחות ולהתעלם מהפגיעה בפרטיות.",
                rankChange: 0,
                coinMultiplier: 0.2,
                feedback: "זוהי תגובה פסיבית. ויתרתם על הצרכים שלכם למען המראיין. נשארתם באותה דרגה.",
                nextScenario: "interview_followup"
            },
            {
                text: "לכעוס על המראיין, להגיד שזו חוצפה ולפוצץ את הראיון.",
                rankChange: -1,
                coinMultiplier: -0.5,
                feedback: "זוהי תגובה אגרסיבית. יצרתם קונפליקט ופגעתם בסיכויים. איבדתם נקודות וירדתם בדרגה.",
                nextScenario: "interview_followup"
            },
            {
                text: "להשיב בנימוס אך באסרטיביות: 'אני מעדיף להתמקד בניסיון המקצועי שלי שיכול לתרום לחברה'.",
                rankChange: 1,
                coinMultiplier: 1.0,
                feedback: "מצוין! זוהי תקשורת אסרטיבית השומרת על הגבולות שלכם בצורה מכבדת. עליתם דרגה!",
                nextScenario: "junior_tech_change"
            }
        ]
    },
    "interview_followup": {
        text: "לאחר הראיון המורכב, קיבלתם הזדמנות נוספת להוכיח את עצמכם במשימת בית. איך תיגשו אליה?",
        options: [
            {
                text: "לעשות את המינימום הנדרש ולקוות לטוב.",
                rankChange: 0,
                coinMultiplier: 0.2,
                feedback: "גישה ריאקטיבית. אין פה חשיבה מתפתחת. נשארתם במקום.",
                nextScenario: "junior_tech_change"
            },
            {
                text: "לחקור את החברה לעומק ולהגיש תוצר שמשקף הבנה של הצרכים העסקיים שלהם.",
                rankChange: 1,
                coinMultiplier: 1.0,
                feedback: "גישה פרואקטיבית! לקחתם יוזמה ואחריות. התקבלתם ועליתם דרגה!",
                nextScenario: "junior_tech_change"
            }
        ]
    },
    "junior_tech_change": {
        text: "מערכת AI חדשה מוטמעת בארגון והופכת חלק מהעבודה שלכם לאוטומטית. איך תגיבו?",
        options: [
            {
                text: "להתלונן שהטכנולוגיה הורסת את המקצוע ולקוות שהארגון יוותר עליה.",
                rankChange: -1,
                coinMultiplier: -0.2,
                feedback: "דפוס חשיבה מקובע. התנגדות לשינוי תוביל להישארות מאחור. ירדתם דרגה.",
                nextScenario: "team_conflict"
            },
            {
                text: "לראות בזה הזדמנות, ללמוד את המערכת בעצמכם ולהציע לייעל תהליכים (Upskilling).",
                rankChange: 1,
                coinMultiplier: 1.0,
                feedback: "מעולה! הפגנתם למידה מתמדת ודפוס חשיבה מתפתח. עליתם דרגה!",
                nextScenario: "team_conflict"
            }
        ]
    },
    "team_conflict": {
        text: "קולגה לעבודה נוטה 'להפיל' עליכם משימות קבועות בטענה שאין לו זמן.",
        options: [
            {
                text: "לעשות את המשימה תוך כדי מרמור ושיתוף עובדים אחרים בתסכול.",
                rankChange: 0,
                coinMultiplier: 0.3,
                feedback: "התנהגות פסיבית-אגרסיבית לא פותרת את הבעיה אלא יוצרת אווירה רעילה.",
                nextScenario: "negotiation"
            },
            {
                text: "לסרב בתקיפות ליד כולם ולומר שהוא מנצל אתכם.",
                rankChange: -1,
                coinMultiplier: -0.5,
                feedback: "אינטליגנציה רגשית נמוכה (חוסר ויסות). תגובה אגרסיבית שפוגעת בעבודת הצוות. ירדתם דרגה.",
                nextScenario: "negotiation"
            },
            {
                text: "לזמן אותו לשיחה אישית, להסביר את העומס שלכם ולהגדיר גבולות ברורים.",
                rankChange: 1,
                coinMultiplier: 1.0,
                feedback: "ניהול רגשות נכון! תקשורת אסרטיבית ופתרון קונפליקטים. עליתם דרגה!",
                nextScenario: "negotiation"
            }
        ]
    },
    "negotiation": {
        text: "אתם מרגישים שתרמתם רבות לחברה ומבקשים העלאת שכר. המנהל אומר שיש קיצוצים.",
        options: [
            {
                text: "לנסות להבין את מצב החברה ולהציע מודל תגמול מבוסס בונוסים על הצלחות עתידיות.",
                rankChange: 1,
                coinMultiplier: 1.0,
                feedback: "מודל העניין הכפול: מצאתם פתרון של שיתוף פעולה (Win-Win) המתחשב באינטרסים של שני הצדדים. עליתם דרגה!",
                nextScenario: "end"
            },
            {
                text: "לאיים בעזיבה אם לא תקבלו את ההעלאה באופן מיידי.",
                rankChange: -1,
                coinMultiplier: -0.4,
                feedback: "תחרות אגרסיבית. הצבת אולטימטום לעיתים קרובות פוגעת ביחסים לטווח ארוך. ירדתם בדרגה.",
                nextScenario: "end"
            },
            {
                text: "לוותר מיד ולהגיד 'אוקי, אולי בשנה הבאה'.",
                rankChange: 0,
                coinMultiplier: 0.2,
                feedback: "ויתור פסיבי. לא עמדתם על הערך שלכם. נשארתם באותה הדרגה.",
                nextScenario: "end"
            }
        ]
    }
};