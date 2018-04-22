# PSK_SuperGalingasAljansas

How to Controller (for example check ItemsController.cs):
1. Create controller class in Controllers folder. (controllers are not restricted for usage of only one DB table, you can create all kinds of mixed controllers that use all DB tables and stuff)
2. Add inheritance from Controller class.
3. Above the class name add tag [Route(subAddressString)] (subAddressString is what goes after domain name - gerasshop.lt/ subAddressString and through this address the controller will be called by client)
4. Write methods that respond to http requests (one method - one request type for that address; you cant write multiple httpGet mehtods for same address). Above method write a http request type tag. For example - [HttpGet] or [HttpPost] and there are some others.
* Sometimes client will send some query attached to address or some parameters in body. To easily disect queries create DTO - data transfer object in DataContracts/DataTransferObjects folder. Then add that DTO to method arguments and add a tag that says where in HTTP request to expect additional info. More info: https://docs.microsoft.com/en-us/aspnet/web-api/overview/formats-and-model-binding/parameter-binding-in-aspnet-web-api
* When you need to get data from DB use Interfaces of repositories. Create private readonly IRepositoryInterface variable and set it in constructor (you can set/use as many repositories as you want in 1 controller)
* You can add subaddresses for http tags. e.g. - [HttpGet("/secondSubaddress")] , that makes our current address -   gerasshop.lt/ subAddressString/secondSubaddress

How to Data Access Layer (Repository pattern) (check ItemsRepository.cs for example):
1. Create Repository class that corresponds to DB table. Ex.: for DB table "Items" create class ItemsRepository.cs in Data/Repositories folder
2. In every repository you have to call DB context. So create private readonly AppDbContext variable and set in constructor.
3. Write methods that will manipulate DB data. Most common ones include: Item Get(int Id), Item Add(Item newItem), Item Update(Item item), void Delete(Item item). (It's good practice to return created/updated element back to bussiness layer and let it decide what to with it - return to client or just ignore it).
4. Create Interface IItemsRepository.cs in DataContracts/RepositoryInterfaces and write all method signatures for methods that you wrote in ItemsRepository.cs
5. In ItemsRepository reference created interface - public class ItemsRepository : IItemsRepository {//code}
6. Inject class in Startup.cs ConfigureServices method like this - services.AddScoped<IItemsRepository, ItemsRepository>();

* How to pull data from DB: AppDbContext variable has all DB tables (classes inside Data/Entities folder) inside of it that you can reference to. Limit your repository access just to that specific table - Itemsrepository should only fetch/save data to Items table in DB.

* If you need to include childrens table data you have to write a query (don't forget to convert query result to List):
https://msdn.microsoft.com/en-us/library/jj574232(v=vs.113).aspx (the most simple of them is Eager) DANGER: DONT USE LAZY LOADING, because this version of EF Core(2.0) doesn't support it


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
