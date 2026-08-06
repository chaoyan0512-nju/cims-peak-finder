# CIMS Peak Finder

**For Better Peak Identification** — developed by Chao Yan, Nanjing University.

A peak-lookup tool for chemical ionisation mass spectrometry. Type the ion formula
you read off your spectrum, tick the reagent ion you used, and it tells you what
the molecule is and who has reported it.

## Use it

**→ https://testuser.github.io/cims-peak-finder/**

Works in any browser. Click *Install* in Chrome or Edge (or *Add to Dock* in
Safari) to get a desktop app with its own window that works offline.

No internet? A single-file version with the data built in is in
[Releases](../../releases) — download it, double-click, done.

## What is in it

| | Records | What a record means |
|---|---|---|
| **Literature database** | 181 | A **neutral molecule** reported and assigned in a published paper |
| **Ion library** | 4 997 | An **ion** present in the fitted peak list of a real measurement |

The two are kept separate on purpose. A literature record has been through peer
review; a peak-list entry only means somebody fitted that peak. The interface
never presents one as the other.

Everything the tool infers — restoring a neutral formula from an ion, expanding a
homologous series a paper states as a range — is labelled as inference and ranked
below evidence. It does not make the chemical call for you.

## Contributing a peak list

Peak lists from other groups are very welcome — a molecule seen by two
independent contributors is far stronger evidence than one seen many times by
the same group. See `PeakLists/README.md` in the development repository for the
format and the metadata needed.

## Licence

Software: MIT. Data: CC BY 4.0, with per-contributor attribution preserved.
See [LICENSE](LICENSE).

If you use this in a publication, please cite the tool and the original papers
in the `reference` column.
