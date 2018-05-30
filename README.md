# PSK_SuperGalingasAljansas

Kūrė VU Programų Sistemų 3 kurso studentai:
- Vilius Mikoliūnas
- Brigita Banevičiūtė
- Domas Stočkus
- Agnė Šimonytė

Techninė ataskaita

Sluoksniai:
- Prezentacijos sluoksnis – parašytas React Javascript kartu su Redux, failai – Eshop/app aplanke
- Aplikacijos sluoksnis – ASP.NET Core v2.0 RESTful API , kontroleriai, kurie priima užklausas ir vykdo verslo logiką – Eshop/Controllers aplanke
- Duomenų prieigos sluoksnis – ASP.NET Core v2.0 duomenis iš duomenų bazės gauna ir perduoda aplikacijos sluoksniui repozitorijos modeliu (repository pattern). Repozitorijų interfeisai – Eshop/DataContracts/RepositoryInterfaces, repozitorijų implementacijos – Eshop/Data/Repositories aplanke, DI – Eshop/Startup.cs faile
- Duomenų bazė -  SQL duomenų bazė pagaminta iš .NET kodo. Programos diegimo metu duomenų bazė sukuriama iš migracijų, kurios yra Eshop/Migrations aplanke. Duomenų bazės lenteles atstojančios klasės – Eshop/Data/Entities aplanke. Duomenų bazė kode yra pasiekiama per Eshop/Data/AppDbContext.cs

Kokybiniai reikalavimai

Concurrency - 
Vartotojas yra skaitomas prisijungusiu jei jo naršyklėje yra išsaugotas prisijungimo tokenas. Kol tokenas ten yra, vartotojas, kad ir kiek langų atsidarys matys, kad jis yra prisijungęs ir galės elgtis kaip prisijungęs vartotojas ir per kelis langus keisti duomenis. Pavyzdžiui – prisidėti prekių į krepšelį. Kiekvieno lango pridėjimo atveju į serverį bus siunčiama nauja prekė, kuria bus papildomas krepšelis. Ir kai vartotojas įsijungs prekių krepšelį jis bus atsiųstas iš serverio, todėl visada bus naujas.
Kode – Eshop/app/Components/ItemView/ItemView.jsx	33, 37 eilutė 

Security - 
Repozitorijos paieškos duomenis gauna per LINQ užklausas, kurios parametrizuoja duomenis prieš siunčiant jas į duomenų bazę. 
Kode – Eshop/Data/Repositories/ItemsRepository.cs	55 eilutė

Data Access - 
Visose duomenų bazės transakcijose naudojami Entity Framework ir LINQ technologijos ir jokios kitos.
Duomenų bazės transakcija vyksta tik tada jei atsiųsti visi reikalingi duomenys ir jie yra validūs (validacija vyksta kontroleriuose), todėl jei paduodami neteisingi duomenys jokios transakcijos „rollback“ daryti nereikia.
Kode – Eshop/Controllers/ItemsController.cs	85, 90, 92 eilutės
Jei duomenys teisingi, jie yra dedami į duomenų bazę ir tada iškart išsaugomi.
Kode – Eshop/Data/Repositories/ItemsRepository.cs	26 eilutėje išsaugomas objektas, 27 – duomenų bazės atnaujinimas išsaugomas

Data consistency; Optimistic locking - 
<Nėra įgyvendinta>

Memory management - 
Kontrolerius tvarko pats ASP.NET, jie yra RequestScoped, kiekvienai užklausai sukuriamas naujas.
Repozitorijos implementacijos DI RequestScoped (.NET vadinasi tiesiog – Scoped)
Kode – Eshop/Startup.cs	101-107 eilutės

Reactive programming; Asynchronous/non-blocking communication - 
Prezentacinis sluoksnis siunčia užklausas serveriui naudojantis asinchroninį Fetch API. Kartu su Redux naudojamas redux-thunk paketas, kuris leidžia atnaujinti prezentacinio sluoksnio dalis kai gražinamas atsakymas iš serverio. 
Kode – Eshop/app/Redux/actions/LoginActions.jsx	16 eilutė

Cross-cutting functionality/Interceptors - 
Žurnalizavimo logika – Eshop/SerilogMiddleware.cs
Žurnalizavimas yra įjungiamas/išjungiamas Startup faile
Kode – Eshop/Startup.cs 	113-114 eilutės

Extensibility/Glass-box extensibility - 
Repozitorijų implementcijas galima keisti naujomis užtenka pakeisti dabartinės pavadinimą pakeisti nauja Startup.cs faile
Kode – Eshop/Startup.cs	101-107 eilutės
