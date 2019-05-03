On crée une classe `Personne` qui a les champs;

* `nom` qui ne peut plus être changé
* `prenom` qui ne peut plus être changé
* `age` qui ne peut que vieillir

Les méthodes à écrire:

* `__construct`
* `getNom`
* `getPrenom`
* `getAge`
* `setAge`

Exemple d'utilisation

```php
$vincent = new Personne('Berset', 'Vincent', 31);
$vincent->setAge(75);
echo $vincent->getPrenom();
```