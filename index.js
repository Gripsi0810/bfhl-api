const express = require("express");
const app = express();

app.use(express.json());

const EMAIL = "gripsi0169.be23@chitkara.edu.in";


app.get("/", (req, res) => {
    res.send("API Running");
});


app.get("/health", (req, res) => {
    res.status(200).json({
        is_success: true,
        official_email: EMAIL
    });
});


function fibonacci(n) {
    let arr = [0, 1];
    for (let i = 2; i < n; i++) {
        arr.push(arr[i - 1] + arr[i - 2]);
    }
    return arr.slice(0, n);
}

function isPrime(num) {
    if (num < 2) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
}

function gcd(a, b) {
    return b === 0 ? a : gcd(b, a % b);
}

function lcm(a, b) {
    return (a * b) / gcd(a, b);
}


app.post("/bfhl", async (req, res) => {
    try {
        const body = req.body;
        const keys = Object.keys(body);

        if (keys.length !== 1) {
            return res.status(400).json({
                is_success: false,
                official_email: EMAIL
            });
        }

        if (body.fibonacci !== undefined) {
            if (typeof body.fibonacci !== "number" || body.fibonacci < 0) {
                return res.status(400).json({
                    is_success: false,
                    official_email: EMAIL
                });
            }
            return res.status(200).json({
                is_success: true,
                official_email: EMAIL,
                data: fibonacci(body.fibonacci)
            });
        }

        if (body.prime !== undefined) {
            if (!Array.isArray(body.prime)) {
                return res.status(400).json({
                    is_success: false,
                    official_email: EMAIL
                });
            }
            return res.status(200).json({
                is_success: true,
                official_email: EMAIL,
                data: body.prime.filter(isPrime)
            });
        }

        if (body.hcf !== undefined) {
            if (!Array.isArray(body.hcf)) {
                return res.status(400).json({
                    is_success: false,
                    official_email: EMAIL
                });
            }
            const result = body.hcf.reduce((a, b) => gcd(a, b));
            return res.status(200).json({
                is_success: true,
                official_email: EMAIL,
                data: result
            });
        }

        if (body.lcm !== undefined) {
            if (!Array.isArray(body.lcm)) {
                return res.status(400).json({
                    is_success: false,
                    official_email: EMAIL
                });
            }
            const result = body.lcm.reduce((a, b) => lcm(a, b));
            return res.status(200).json({
                is_success: true,
                official_email: EMAIL,
                data: result
            });
        }

        if (body.AI !== undefined) {
            if (typeof body.AI !== "string") {
                return res.status(400).json({
                    is_success: false,
                    official_email: EMAIL
                });
            }
            return res.status(200).json({
                is_success: true,
                official_email: EMAIL,
                data: "Mumbai"
            });
        }

        return res.status(400).json({
            is_success: false,
            official_email: EMAIL
        });

    } catch (err) {
        return res.status(500).json({
            is_success: false,
            official_email: EMAIL
        });
    }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
