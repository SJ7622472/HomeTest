# ארכיטקטורת מערכת בענן + DevOps (AWS)

## שרטוט ארכיטקטורה

```
[משתמשים]
    |
[CloudFront CDN]
    |
[S3 (Static React)]
    |
[API Gateway]
    |         \
[Elastic Beanstalk/ECS]---[Node.js]---[DocumentDB/MongoDB]
    |         \
    |         [ASP.NET Core]---[RDS (SQL Server)]
    |
[VPC]
    |
[Security Groups]
    |
[CloudWatch, IAM, Secrets Manager, CodePipeline]
```

---

## רכיבים מרכזיים והסבר

### 1. S3 + CloudFront
- אחסון סטטי של קבצי ה-Client (React)
- הפצה מהירה ומאובטחת לכל העולם

### 2. Elastic Beanstalk/ECS
- הרצת שרתי Node.js ו-.NET בסביבה מנוהלת
- ניהול אוטומטי של סקיילינג, עדכונים, ניטור

### 3. RDS (SQL Server)
- מסד נתונים רלציוני מנוהל לקטגוריות ומוצרים
- גיבויים, אבטחה, ביצועים גבוהים

### 4. DocumentDB/MongoDB Atlas
- מסד NoSQL להזמנות
- גמישות, סקיילינג, אינדוקס מהיר

### 5. VPC
- רשת פרטית מאובטחת לכל הרכיבים
- שליטה מלאה על תעבורה והרשאות

### 6. Security Groups
- חומות אש בין רכיבים
- פתיחת פורטים רק למה שצריך

### 7. IAM
- ניהול הרשאות וגישה לכל שירות ומשאב
- אבטחה ברמת משתמש, שירות וקבוצה

### 8. CodePipeline + CodeBuild
- CI/CD אוטומטי: בנייה, בדיקות, דיפלוי
- אוטומציה מלאה לכל תהליך הפיתוח

### 9. ECR
- אחסון Docker Images
- ניהול גרסאות, הפצה ל-ECS/Beanstalk

### 10. CloudWatch
- ניטור לוגים, ביצועים, התראות
- דשבורדים ואלרטים אוטומטיים

### 11. Parameter Store/Secrets Manager
- שמירת סיסמאות, API Keys וערכים רגישים
- גישה מאובטחת מהקוד בלבד

---

## דגשים על אוטומציה, ניטור, אבטחה וניהול תצורה
- **אוטומציה:** כל תהליך דיפלוי, עדכון, בדיקות וניהול תצורה מתבצע אוטומטית ב-CodePipeline.
- **ניטור:** CloudWatch אוסף לוגים, מודד ביצועים, שולח התראות.
- **אבטחה:** IAM, Security Groups, Secrets Manager, SSL בכל רכיב.
- **ניהול תצורה:** Parameter Store/Secrets Manager, קבצי קונפיגורציה ב-S3.

---
