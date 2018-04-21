# PSK_SuperGalingasAljansas

Update DB:
1. Open cmd in same dir there Startup.cs is (.../Eshop/Eshop)
2. type in cmd - dotnet ef database update

How to update DB with new(or edited old stuff):
1. Create classes(that will correspond to DB tables) in Data -> Entities directory
2. Create relashioships between these classes(DB tables) (info link:https://docs.microsoft.com/en-us/ef/core/modeling/relationships#conventions)
3. Add new classes/tables to Data->AppDbContext.cs. Example: public DbSet<Item> Items {get;set;} (and yes - item name is singular, db table name is plural)
4. Build solution
5. Open cmd in same dir there Startup.cs is (.../Eshop/Eshop)
6. type in cmd - dotnet ef migrations add MigrationName (Migration name is ussually a title that describes what changed compared to last DB version. More info on migrations - https://docs.microsoft.com/en-us/ef/core/managing-schemas/migrations/)
if you get fail : ... Tapable.plugin is deprecated ignore it
7. type in cmd - dotnet ef database update

if you need revert changes:
type in cmd - dot net ef database update NameOfMigrationYouWantToRevertTo


First launch instructions:

0. Install Node.js (https://nodejs.org/en/download/)
1. Open project in Visual Studio
2. In Solution explorer under "Dependencies" tab, right-click on "npm" folder and click "restore packages" (this might take a while)
3. After restoring packages (yellow triangle icon on npm folder should be replaced by black gift icon) press F5
4. At first you might get "FileNotFoundException: Could not find file: /dist/index.html". Stop the project and launch again - it should work now (if it doesn't , try stop and launch few more times)
