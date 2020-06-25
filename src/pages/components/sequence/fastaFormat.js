export default class FastaFormat {

    constructor(sequence) {
        this.sequence = sequence
        this.count = 0
        this.nucleotideA = 0
        this.nucleotideT = 0
        this.nucleotideC = 0
        this.nucleotideG = 0
        this.formatSequence = ''
        this.Format(sequence)
    }

    Format(sequence) {
        this.formatSequence = [].map.call(sequence, (x, index) => {
            this.count += 1
            switch (x) {
                case 'A':
                    this.nucleotideA += 1
                    break;
                case 'T':
                    this.nucleotideT += 1
                    break;
                case 'C':
                    this.nucleotideC += 1
                    break;
                case 'G':
                    this.nucleotideT += 1
                    break;
                default:
                    break;
            }
            if (this.count === 60) {
                this.count = 0;
                return `${x}<br>`
            } else {
                return x;
            }
        }).join('')

    }
}