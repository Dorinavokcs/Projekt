import string
import time

def rajzol_ember(elet):
    akasztofa_kepek = [
        """  
        ---------
        """,
        """
           |    
           |     
           |     
           |    
           |    
        ---------
        """,
        """
           _______
           |     |
           |     
           |     
           |    
           |    
        ---------
        """,
        """
           _______
           |     |
           |     O
           |    
           |    
           |    
        ---------
        """,
        """
           _______
           |     |
           |     O
           |     |
           |    
           |    
        ---------
        """,
        """
           _______
           |     |
           |     O
           |    /|\\
           |    / 
           |    
        ---------
        """,
        """
           _______
           |     |
           |     O
           |    /|\\
           |    / \\
           |    
        ---------
        """
    ]
    return akasztofa_kepek[6 - elet]

def akasztofa_jatek(szo):
    betuk = set(szo.lower())
    kitalalt_betuk = set()
    hibas_betuk = set()
    elet = 6
    start_time = time.time()
    
    while elet > 0:
        eltel_tipp = time.time() - start_time
        print("\n" + "-" * 20)
        print(f"Elérhető élet: {elet}")
        print(f"Eltelt idő: {round(eltel_tipp)} másodperc")
        print("Rossz betűk: ", ", ".join(sorted(list(hibas_betuk))))
        
        talalatlan_betuk = [betu if betu in kitalalt_betuk else '_' for betu in szo.lower()]
        print(" ".join(talalatlan_betuk))
        
        print("\n" + rajzol_ember(elet))
        
        if len(kitalalt_betuk) == len(betuk):
            print("\nGratulálok! Kitaláltad a szót:", szo)
            break
        
        tipp = input("\nTippelj egy betűt: ").lower()
        
        if tipp in string.ascii_lowercase:
            if tipp in betuk:
                kitalalt_betuk.add(tipp)
            else:
                hibas_betuk.add(tipp)
                elet -= 1
                print(f"A '{tipp}' betű nincs a szóban.")
        else:
            print("Kérlek, csak betűket adj meg!")
    
    else:
        print("\nVesztettél! A szó:", szo)
        print("\n" + rajzol_ember(0))

# A szót itt tudod megadni
szo = "alma"
akasztofa_jatek(szo)